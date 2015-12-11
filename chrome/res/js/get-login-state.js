/**
Injection script - once executed, retrieves whether the user is currently connected.
NOTE: This was once implemented with cookies, however it seems that Moodle does not locally
erase cookies upon logout, so this led to some client-side bugs
**/

function getIsLoginRequired() {
    var loginDiv = document.getElementsByClassName("logininfo")[0];
    return (loginDiv.innerHTML.indexOf("התחברות") > -1 || loginDiv.innerHTML.indexOf("Log in") > -1);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message["type"] == "isLoginRequired") {
        var res = getIsLoginRequired();
        chrome.runtime.sendMessage({"type": "shouldLogin", "value": res});
    }
});