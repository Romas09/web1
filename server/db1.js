const Pool = require('pg').Pool
const pool= new Pool({
    user:"postgres",
    password:"1234",
    host:"localhost",
    DB_PORT:5432,
    database:"online_store"
})
module.exports = pool