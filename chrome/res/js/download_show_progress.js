/**
Injection script - once executed, displays and updates the download progress
**/

var bar = undefined;
var txt = undefined;
var scanned = 0;
var total = 0;

function show_download_bar() {
    bar = document.createElement("div");
    bar.style.cssText = "position: fixed; bottom: 0px; right: 0px; width: 400px; z-index: 10000; padding: 10px; background-color: rgba(17,123,187,0.9); text-align: left; vertical-align: middle;";
    
    txt = document.createElement("label");
    txt.style.cssText = "color: white; font-size: 15px; font-weight: bold; vertical-align: middle; direction: ltr; margin: 0px;";
    txt.innerText = "Initializing...";
    bar.appendChild(txt);

    document.body.appendChild(bar);
}

function hide_download_bar() {
	document.body.removeChild(bar);
	txt = undefined;
	bar = undefined;
}

function update_scan(progress, total, found) {
	txt.innerText = "Scanning " + progress + "/" + total + "... (" + found + " matches found)";
}

show_download_bar();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message["type"] == "showDownloadBar")
		show_download_bar();
	if(message["type"] == "updateDownloadBar")
		update_scan(++scannned, message["value"][0], message["value"][1]);
});