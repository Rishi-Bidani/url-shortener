const pg = require("pg");
const path = require("path")
const dotenv = require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const knex = require("knex")({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : process.env.SQL_USER,
    password : process.env.SQL_PASS,
    database : process.env.SQL_DB
  }
});

class DB{
    static async insert(table, data){
        // data is an array
        const result = await knex(table).insert(data)
        return result
    }
}

module.exports = DB