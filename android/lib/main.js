var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");


/************ Logic ************/

/* Authenticates the user by sending a POST request to the login page on a separate
   thread. Once completed, reloads the page by injecting reload.js into the DOM */
function loginToMoodle(user, password, worker) {
    var Request = require("sdk/request").Request;
    
    var doLogin = Request(
        {
            url: "https://moodle.technion.ac.il/login/index.php",
            contentType: "application/x-www-form-urlencoded",
            content: "username=" + user + "&password=" + password + "&rememberusername=1",
            onComplete: function(response) {
            
                // Once done, reload the page and destroy the worker
                worker.port.emit("reloadTab");
                worker.destroy();
            }
        }
    );
    
    doLogin.post();
}

/* Use PageMod to conditionally inject get-login-state.js into the DOM in order to check whether the
   user is logged into the domain moodle.technion.ac.il. If the user is not logged in,
   calls loginToMoodle to handle the login process */
pageMod.PageMod(
    {
        include: "*.moodle.technion.ac.il",
        contentScriptFile: [data.url("get-login-state.js"), data.url("reload.js"), data.url("connecting-overlay.js")],
        onAttach: function(worker) {
        
            // Only execute if the addon is enabled
            var enabled = require('sdk/simple-prefs').prefs['enabled'];
            if(enabled == 1) {
            
                // Execute the injected code
                worker.port.emit("isLoginRequired");
                worker.port.on("isLoginRequiredResult", function(result) {
                    if(result) {
                    
                        // Show an overlay over the page with the loader.gif image
                        worker.port.emit("showOverlay", data.url("loader.gif"));
                        var user = require('sdk/simple-prefs').prefs['username'];
                        var pass = require('sdk/simple-prefs').prefs['password'];
                        loginToMoodle(user, pass, worker);
                    }
                });
            }
        }
    }
);
