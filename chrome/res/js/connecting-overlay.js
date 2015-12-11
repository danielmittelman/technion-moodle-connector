/**
Injection script - once executed, displays an overlay over the entire page with an AJAX loader graphic
**/

function show_overlay() {
    var overlay = document.createElement("div");
    overlay.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000; background-color: rgba(255,255,255,0.7); text-align: center; vertical-align: middle;";
    
    var loading = document.createElement("div");
    loading.style.cssText = "z-index: 10001; position: absolute;top: 50%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%)";
    loading.innerHTML = "<h2 style='direction: ltr;'>Connecting to Moodle...</h2><br/><img src='" + chrome.extension.getURL('res/loader.gif') + "'>";
    overlay.appendChild(loading);
    
    document.body.appendChild(overlay);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message["type"] == "showOverlay")
		show_overlay();
});