// Made by Rishi
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const posts = require("./routes/posts");

app.set("views", path.join(__dirname, "templates"));
app.use(express.static("static"))
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//For Form data etc
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Post Requests
app.use("/posts", posts.router);


app.get("/", (req, res) => {
    res.render("index")
})

const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log("Website live on: " + `http://localhost:${port}`);
});
