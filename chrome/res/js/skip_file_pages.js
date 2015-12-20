function shouldSkip() {
	var url = window.location.href;
	return (url.indexOf("mod/resource/view.php") > -1 && url.indexOf("redirect=1") == -1);
}

if(shouldSkip()) {
	chrome.runtime.sendMessage({"type": "skip_download_page"}, null);
}