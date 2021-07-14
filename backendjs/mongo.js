const mongodb = require("mongodb");
const path = require("path");
// Environment Variables
const dotenv = require("dotenv").config({path: path.resolve(__dirname, "../.env")});

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
}

// const usemongo = new UseMongo();
// usemongo.genKey().then(key => {
//     usemongo.writeKey(key, "TestingClassInsert").then(data => {
//         console.log(data)
//     })
// })

module.exports = {UseMongo}