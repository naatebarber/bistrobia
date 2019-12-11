const http = require("http"),
    contentful = require("contentful"),
    PORT = 8080;

var server = http.createServer();
var cf = contentful.createClient({
    space: "u1n96xp4szaw",
    accessToken: "5bb9cf2a0f26432f24ed31e19b5d8e89d6c23dcb43adea7268c7386b10b5366e"
});

server.on("request", async (req, res) => {
    let request = `${req.method} ${req.url.split("?")[0]}`;
    let params = {};
    req.url.split("?")[1].split("&").forEach(pair => {
        params[pair.split("=")[0]] = pair.split("=")[1];
    });
    console.log("Request at " + request + " with params: " + JSON.stringify(params));
    switch(request) {
        case "GET /cf_entry":
            const space = params.entryID ? await cf.getEntry(params.entryID) : "Bad request. No entry ID";
            console.log(space);
            res.writeHead(200, {"ContentType": "text/json"});
            res.end(JSON.stringify(space));
            break;
        default:
            res.writeHead(200);
            res.end("Content Not Available");
    }
});

server.listen(PORT, () => {
    console.log("Server running on " + PORT);
});