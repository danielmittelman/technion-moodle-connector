// Extracts all the links in the page that match Moodle's file URL
var FILE_LINK_REGEX = new RegExp(".*mod\/resource\/view\.php.*");
var EXPLICIT_LINK_REGEX = undefined;

function extractPotentialLinks() {
	var allLinks = document.getElementsByTagName("a");
	var potLinks = []

	for(var i = 0 ; i < allLinks.length ; i++) {
		if(FILE_LINK_REGEX.test(allLinks[i].href))
			potLinks.push(allLinks[i].href);
	}

    return potLinks;
}

// Resolves all the links to their explicit URI
function unmaskLinks(masked_links, pattern) {
	var links = [];
	EXPLICIT_LINK_REGEX = new RegExp(".*pluginfile\.php\/.*\/mod_resource\/content\/.*" + pattern.replace(".", "\.").replace("*", ".*"));

	for(var i = 0 ; i < masked_links.length ; i++) {
		// Send 5 GET requests per second to not overwhelm the server
		setTimeout(resolveSingleLink , 200 * i, masked_links[i], links);
	}
}

function resolveSingleLink(link, collected_links) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", link, true);
	xhr.responseType = "document";
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			// Parse the response HTML page and extract the explicit link
			var responseLinks = xhr.responseXML.getElementsByTagName("a");
			notifyPluginOnCheckingLink();
			for(var i = 0 ; i < responseLinks.length ; i++) {
				if(EXPLICIT_LINK_REGEX.test(responseLinks[i].href)) {
					collected_links.push(responseLinks[i].href);
					//console.log("Found actual link! " + responseLinks[i].href);
					notifyPluginOnLink(responseLinks[i].href);
					break;
				}
			}
		}
	}
	xhr.send();
}

function notifyPluginOnLink(link) {
	chrome.runtime.sendMessage({"type": "foundLink", "link": link});
}

function notifyPluginOnCheckingLink(link) {
	chrome.runtime.sendMessage({"type": "checkingLink"});
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message["type"] == "getMatchingLinks") {
    	var potLinks = extractPotentialLinks();
    	unmaskLinks(potLinks, message["pattern"]);
    }
});


/*
var potLinks = extractPotentialLinks();
var subLinks = []
for(var i = 0 ; i < 10 ; i++) subLinks.push(potLinks[i]);
unmaskLinks(potLinks, "*.pdf");
*/
