// Use HTML5's local storage API to store the key-value preferences

function saveSettings() {
    localStorage.setItem("enabled", document.getElementById("enabled").checked);
    localStorage.setItem("username", document.getElementById("username").value);
    localStorage.setItem("password", document.getElementById("password").value);
}

function loadSettings() {
    console.log("Loading settings");
    document.getElementById("username").value = (localStorage.username === undefined) ? "" : localStorage.username;
    document.getElementById("password").value = (localStorage.password === undefined) ? "" : localStorage.password;

    var isEnabled = (localStorage.enabled === undefined) ? false : localStorage.enabled;
    if(isEnabled === true || isEnabled == "true")
        document.getElementById("enabled").checked = true;
}

function saveAndClose() {
    saveSettings();
    window.close();
}

function respondToEnter(e) {
    if(e.keyCode == 13)
        saveAndClose();
}

function startDownload() {
    var pattern = document.getElementById("download_pattern").value;
    chrome.runtime.sendMessage({"type": "downloadAllLinks", "pattern": pattern});
}

// Load settings when the DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
});

// Save and close whenever the Save button is pressed, or Enter is pressed when focused on a textbox
document.getElementById("save").addEventListener("click", saveAndClose);
document.getElementById("username").addEventListener("keydown", respondToEnter);
document.getElementById("password").addEventListener("keydown", respondToEnter);

document.getElementById("download_button").addEventListener("click", startDownload);

//- Ask Cristina where she applies the Smearing filter in Mathematia
//- Create a more complex Smearing filter