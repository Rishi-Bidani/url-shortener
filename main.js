// Made by Rishi
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const posts = require("./routes/posts");
const geoip = require('geoip-lite');
const dotenv = require("dotenv").config({path: path.resolve(__dirname, ".env")});
const session = require("express-session");
const codeToCountry = require('./database/countryCodeData.json');
const TWO_HOURS = 1000 * 60 * 60 * 2;
const IN_PROD = process.env.NODE_ENV === "production"

app.set("views", path.join(__dirname, "templates"));
app.use(express.static("static"))
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//For Form data etc
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Setup sessions
app.use(
    session({
        name: process.env.SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESS_SECRET,
        cookie: {
            maxAge: TWO_HOURS,
            sameSite: true,
            secure: IN_PROD,
        },
    })
);


// Post Requests
app.use("/posts", posts.router);

// Autherntication
const redirectHome = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
};

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


app.get("/dashboard", redirectHome, (req, res)=>{
    const user = req.session.userId
    // res.send(user+"Logged In")
    res.render("dashboard")
})

const port = process.env.PORT || 5000;
http.listen(port,"0.0.0.0", () => {
    console.log("Website live on: " + `http://localhost:${port}`);
});