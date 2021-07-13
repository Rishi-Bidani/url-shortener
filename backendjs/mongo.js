const mongodb = require("mongodb");
const path = require("path");
const {KeyGen} = require("./KeyGen");

// Environment Variables
const dotenv = require("dotenv").config({path: path.resolve(__dirname, "../.env")});
const password = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const user = process.env.DB_USER;
// ================================================================================================================= //
const uri = `mongodb+srv://${user}:${password}@cluster0.oqyh2.mongodb.net/shortener?retryWrites=true&w=majority`

async function urldata() {
    const client = await mongodb.MongoClient.connect
    (uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client.db(dbname).collection("urls")
}

//
// async function test() {
//     const urls = await urldata();
//     const data = await urls.find({}).toArray()
//     console.log(data)
//     await urls.insertOne({
//         short: "hello2",
//         full: "The full url 2"
//     });
// }

/* =========================================================
*   This function takes a parameter of the short url
*   and returns whether the url/key exists and is unique or not
*
* ==========================================================*/
async function checkKey(short) {
    const urls = await urldata();
    const data = await urls.find({short: short}).toArray();
    if (data.length === 1) {
        return {unique: true, data: data[0].full}
    } else if(data.length > 1){
        return {unique: false, data: "multiple"}
    }else {
        return {unique: false, data: "N/A"}
    }
}

async function genKey() {
    const key = new KeyGen().returnKey();
    const {unique, data} = await checkKey(key);
    console.log()
    if (! unique){
        console.log(key)
        return key
    }else{
        await genKey()
    }
}

genKey().then(r => console.log(r))

// test()
// checkKey("hello2")
// const key = new KeyGen();
// console.log(key.returnKey())