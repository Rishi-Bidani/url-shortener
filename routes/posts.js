const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const {UseMongo} = require("../backendjs/mongo");
const usemongo = new UseMongo("shortener", "urls");
const registermongo = new UseMongo("authenticate", "details")


// Register
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body["registerPassword"], 10);
        const {registerName, registerUsername} = req.body;
        registermongo.register(registerName, registerUsername, hashedPassword).then((data) => {
            console.log(data)
            res.status(201).send()
        })
    } catch {
        res.status(500).send()
    }


})

// Login


// Submit Link for shortening
router.post("/submit-link", async (req, res) => {
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


module.exports = {router}