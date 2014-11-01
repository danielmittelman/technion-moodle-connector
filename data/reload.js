/**
Injection script - once executed, forces the page to reload from the server (and not from cache)
**/

self.port.on("reloadTab", function() {
    window.location.reload(true);
});
