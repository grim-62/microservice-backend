const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host:process.env.DB_HOST ||"localhost",
    user:process.env.DB_USER || "root",
    password:process.env.DB_PASS || "Prashant@62d",
    database:process.env.DB_NAME || "learn1"
});

module.exports = pool;

