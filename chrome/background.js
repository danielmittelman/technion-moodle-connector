/**
This is the main extension's code, also known as the background page script in Chrome extensions.
This file communicates with the content scripts that have been injected into the active webpage
if it is a Moodle page. It uses HTML5's local storage API to load the stored username and password.
Since the login credentials to the Moodle are static, and sometimes transferred in plain text,
it seemed like an overkill to store them in an encrypted storage location.
**/

// Global message listener
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log("Got message: type is " + message["type"]);
	if(message["type"] == "init" && getShouldRun() === true) {
		checkLoginRequired();
	}
	if(message["type"] == "shouldLogin" && message["value"] === true) {
		// If the user just logged out, it's best to wait a little before logging back in
		setTimeout(loginToMoodle, 300);
	}
	if(message["type"] == "skip_download_page") {
		chrome.tabs.update(sender.tab.id, {url: sender.tab.url + "&redirect=1"});
	}
});

function sendToActiveTab(message) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message)
	});
}

function reloadActiveTab() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.reload(tabs[0].id);
	});
}

function getShouldRun() {
	return localStorage.enabled !== undefined 
		&& localStorage.enabled != "undefined"
		&& localStorage.enabled !== false
		&& localStorage.enabled != "false"
		&& localStorage.username !== undefined 
		&& localStorage.password !== undefined;
}

function checkLoginRequired() {
	sendToActiveTab({"type": "isLoginRequired"});
}

function getLoginCreds() {
	// This function assumes that username and password are defined in the local storage
	return {"username": localStorage.username, "password": localStorage.password};
}

function loginToMoodle() {
	sendToActiveTab({"type": "showOverlay"});

	var xhr = new XMLHttpRequest();
	var creds = getLoginCreds();
	xhr.open("POST", "https://moodle.technion.ac.il/login/index.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			finishLogin();
		}
	};

	xhr.send("username=" + creds["username"] + "&password=" + creds["password"] + "&rememberusername=1");
}

function finishLogin() {
	reloadActiveTab();
}