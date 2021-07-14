const express = require("express");
const router = express.Router();
const path = require("path");

const {UseMongo} = require("../backendjs/mongo");
const usemongo = new UseMongo()


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