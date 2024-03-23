import mysql = require('mysql2/promise');

async function createConnection() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        port: 30036,
        user: 'root',
        password: 'root',
        database: 'prgms_notes'
    });
    return conn;
}

export default createConnection;