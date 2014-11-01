self.port.on("panelLoad", function(payload) {
        document.getElementById("enabled").checked = (payload.enabled == 1);
        document.getElementById("username").value = payload.username;
        document.getElementById("password").value = payload.password;
    }
);

self.port.on("panelGetSettings", function() {
        var settings = {
            "enabled": document.getElementById("enabled").checked,
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value
        };
        
        self.port.emit("panelGetSettingsResult", settings);
    }
);
