// Made by Rishi
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const posts = require("./routes/posts");
const geoip = require('geoip-lite');
const codeToCountry = require('./database/countryCodeData.json');

app.set("views", path.join(__dirname, "templates"));
app.use(express.static("static"))
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//For Form data etc
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// Post Requests
app.use("/posts", posts.router);


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/login", (req, res)=>{
    res.render("login")
})

app.get('/ip', (req, res) => {
    const ip = req.ip;
    // console.log(ip); // ip address of the user
    const geo = geoip.lookup("123.161.170.57");
    console.log(geo)
    console.log(codeToCountry[geo.country])
    res.end()
});

const port = process.env.PORT || 5000;
http.listen(port,"0.0.0.0", () => {
    console.log("Website live on: " + `http://localhost:${port}`);
});
