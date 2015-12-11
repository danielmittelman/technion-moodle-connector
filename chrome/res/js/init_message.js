// This script is used to initiate the extension workflow whenever a relevant page is loaded

chrome.runtime.sendMessage({"type": "init"}, null);