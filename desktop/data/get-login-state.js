/**
Injection script - once executed, retrieves whether the user is currently conntected.
NOTE: This was once implemented with cookies, however it seems that Moodle does not locally
erase cookies upon logout, so this led to some client-side bugs
**/

//NOTE unused code
/*function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

self.port.on("hasCookie", function() {
        var cookie = getCookie("MOODLEID1_technion19");
        self.port.emit("hasCookieResult", cookie != null);
    }
);*/

function getIsLoginRequired() {
    var loginDiv = document.getElementsByClassName("logininfo")[0];
    return (loginDiv.innerHTML.contains("התחבר") || loginDiv.innerHTML.contains("Login"));
}

self.port.on("isLoginRequired", function() {
        self.port.emit("isLoginRequiredResult", getIsLoginRequired());
    }
);
