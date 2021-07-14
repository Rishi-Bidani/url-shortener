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

// async function urldata() {
//     const client = await mongodb.MongoClient.connect
//     (uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     return client.db(dbname).collection("urls")
// }

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
* ==========================================================*/
// async function checkKey(short) {
//     const urls = await urldata();
//     const data = await urls.find({short: short}).toArray();
//     if (data.length === 1) {
//         return {unique: true, data: data[0].full}
//     } else if (data.length > 1) {
//         return {unique: false, data: "multiple"}
//     } else {
//         return {unique: false, data: "N/A"}
//     }
// }
//
// async function genKey() {
//     const key = new KeyGen().returnKey();
//     const {unique, data} = await checkKey(key);
//     console.log()
//     if (!unique) {
//         return key
//     } else {
//         await genKey()
//     }
// }
//
// async function writeKey(short, long) {
//     const urls = await urldata();
//     const finish = await urls.insertOne({
//         short: short,
//         full: long
//     })
//     return finish
// }
//
// genKey().then(key => {
//     writeKey(key, "thisWillBeTheLongOne").then(res => console.log(res))
// })

// test()
// checkKey("hello2")
// const key = new KeyGen();
// console.log(key.returnKey())

// Return unique key
//

class UseMongo {
    constructor() {
        this.password = process.env.DB_PASS;
        this.dbname = process.env.DB_NAME;
        this.user = process.env.DB_USER;
        this.uri = `mongodb+srv://${this.user}:${this.password}@cluster0.oqyh2.mongodb.net/shortener?retryWrites=true&w=majority`
        this.table = "urls"
    }

    async access() {
        const client = await mongodb.MongoClient.connect
        (this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return client.db(this.dbname).collection(this.table)
    }

    async checkKey(key) {
        const urls = await this.access();
        const data = await urls.find({short: key}).toArray();
        if (data.length === 1) {
            return {unique: true, data: data[0].full}
        } else if (data.length > 1) {
            return {unique: false, data: "multiple"}
        } else {
            return {unique: false, data: "N/A"}
        }
    }

    async genKey() {
        const key = new KeyGen().returnKey();
        const {unique, data} = await this.checkKey(key);
        console.log()
        if (!unique) {
            return key
        } else {
            await genKey()
        }
    }

    async writeKey(short, long) {
        const urls = await this.access();
        const finish = await urls.insertOne({
            short: short,
            full: long
        })
        return {
            data: finish.ops
        }
    }

}

const usemongo = new UseMongo();
usemongo.genKey().then(key=>{
    usemongo.writeKey(key, "TestingClassInsert").then(data=>{
        console.log(data)
    })
})