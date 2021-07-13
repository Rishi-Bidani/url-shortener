// Made by Rishi
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
app.set("views", path.join(__dirname, "templates"));


const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log("Website live on: " + `http://localhost:${port}`);
});
