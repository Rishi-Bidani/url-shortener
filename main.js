// Made by Rishi
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const {UseMongo} = require("./backendjs/mongo");
const usemongo = new UseMongo()

app.set("views", path.join(__dirname, "templates"));
app.use(express.static("static"))
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/posts/submit-link", async (req, res) => {
    const {fullLink} = req.body;
    console.log(fullLink);
    usemongo.genKey().then((key) => {
        console.log(key)
        // res.end();
        usemongo.writeKey(key, fullLink).then(async (data) => {
            console.log(data)
            res.json(key).end();
        })
    })
})


const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log("Website live on: " + `http://localhost:${port}`);
});
