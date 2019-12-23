const express = require("express"),
    bodyParser = require("body-parser"),
    contentful = require("contentful"),
    stripe = require("stripe");

const contentHooks = require("./contentHooks"),
    getEntry = require("./server/contentful/getEntry"),
    getPost = require("./server/contentful/getPost"),
    handleCharge = require("./server/stripe/handleCharge");

const contentfulClient = contentful.createClient({
        space: "u1n96xp4szaw",
        accessToken: "5bb9cf2a0f26432f24ed31e19b5d8e89d6c23dcb43adea7268c7386b10b5366e"
    }),
    stripeClient = stripe(contentHooks.STRIPE_SECRET_KEY);

const PORT = 9000;

const app = express();
app.use(bodyParser.json())
   .use(express.static(__dirname + "/dist"))
   .get("/cf_entry", getEntry(contentfulClient))
   .get("/cf_post", getPost(contentfulClient))
   .get("/charge", handleCharge(stripeClient))
   .get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html", err => res.status(500).send(err)))
   .listen(PORT, () => console.log("Server running on port " + PORT))