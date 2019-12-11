const http = require("http"),
    fs = require("fs"),
    mime = require("mime-types"),
    contentful = require("contentful"),
    PORT = 9000;

var server = http.createServer();
var cf = contentful.createClient({
    space: "u1n96xp4szaw",
    accessToken: "5bb9cf2a0f26432f24ed31e19b5d8e89d6c23dcb43adea7268c7386b10b5366e"
});

server.on("request", async (req, res) => {
    let request = `${req.method} ${req.url.split("?")[0]}`;
    let params = {};
    if(req.url.includes("?"))
        req.url.split("?")[1].split("&").forEach(pair => {
            params[pair.split("=")[0]] = pair.split("=")[1];
        });
    console.log("Request at " + request + " with params: " + JSON.stringify(params));
    switch(request) {
        case "GET /":
            fs.readFile(__dirname + "/dist/index.html", (err, data) => {
                if(err) return res.writeHead(500).end("ISE");
                return res.writeHead(200, {"Content-Type": mime.lookup(".html")}).end(data);
            });
            break;
        case "GET /cf_entry":
            const space = params.entryID ? await cf.getEntry(params.entryID) : "Bad request. No entry ID";
            console.log(space);
            res.writeHead(200, {"ContentType": "text/json"}).end(JSON.stringify(space));
            break;
        default:
            let path = __dirname + "/dist" + (req.url.includes("?") ? req.url.split("?")[0] : req.url);
            console.log(path);
            fs.exists(path, exist => {
                if(exist)
                    return fs.readFile(path, (err, data) => {
                        if(err) 
                            return res.writeHead(500).end("ISE");
                        return res.writeHead(200, {"Content-Type": mime.lookup(path.substring(path.indexOf(".")))}).end(data);
                    });
                return res.writeHead(404).end("Content Not Available");
            })
    }
});

server.listen(PORT, () => {
    console.log("Server running on " + PORT);
});