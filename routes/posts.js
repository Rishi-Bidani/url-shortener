const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../backendjs/sqlknex")

const {UseMongo} = require("../backendjs/mongo");
const usemongo = new UseMongo("shortener", "urls");
const registermongo = new UseMongo("authenticate", "details")
const authtable = "authentication"


const authenticate = (req, res, next) => {

}

// Register
router.post("/register", async (req, res) => {
    // try {
        console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body["registerPassword"], 10);
    const {registerName, registerUsername, registerEmail} = req.body;
    console.log(registerName, registerUsername, registerEmail)
    // Check if username and email is unique
    const validate = await db.checkUnique(authtable, "username", registerUsername) &&
        await db.checkUnique(authtable, "email", registerEmail)
    console.log(validate)
    if (validate) {
        db.insert("authentication", [{
            fullname: registerName,
            username: registerUsername,
            password: hashedPassword,
            email: registerEmail
        }]).then(data => {
            console.log(data)
            res.status(201).send()
        })
    } else {
        res.status(422).json("NOT UNIQUE")
    }
    //
    // } catch {
    //     res.status(500).send()
    // }


})

// Login
router.post("/login", async (req, res)=>{
    const {username, password} = req.body
    const user = await db.find(authtable, "username", username)
    if(user.length === 1){
        try {
            if(await bcrypt.compare(password, user[0].password)){
                req.session.userId = username;
                res.redirect(`/dashboard`)
            }else{
                res.status(422).json("Incorrect Password")
            }
        }catch{
            res.status(422).json("ERROR")
        }
    }else{
        res.status(406).json("Could Not Find User")
    }
})

// Submit Link for shortening
router.post("/submit-link", async (req, res) => {
    const {fullLink} = req.body;
    console.log(fullLink);
    // usemongo.genKey().then((key) => {
    //     console.log(key)
    //     // res.end();
    //     usemongo.writeKey(key, fullLink).then(async (data) => {
    //         console.log(data)
    //         res.json(key).end();
    //     })
    // })
    const {unique, key} = await db.genKey()
    if(unique){
        const data = {
            // username: req.session.username,
            username: "admin",
            short: `localhost:3000/${key}`,
            full: fullLink,
            key: key
        }
        await db.insert("urls", data)
        res.status(201).json(key)
    }else{
        res.status(422).json("Failed")
    }
})


module.exports = {router}