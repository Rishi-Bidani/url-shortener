// Made by Rishi
// This app will be for redirecting pages
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const {UseMongo} = require("./backendjs/mongo");
app.set("views", path.join(__dirname, "templates"));
const db = require("./backendjs/sqlknex");
const usemongo = new UseMongo()

app.get("/:key", async(req, res)=>{
    const key = req.params.key;
    // usemongo.checkKey(key).then(data =>{
    //     console.log(data.data)
    //     res.redirect(data.data)
    // })
    if(await db.checkExistsAndUnique("urls", "key", key)){
        const data = await db.find("urls", "key", key)
        res.redirect(data[0].full)
    }else{
        console.log("error")
    }
})


const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("Website live on: " + `http://localhost:${port}`);
});
