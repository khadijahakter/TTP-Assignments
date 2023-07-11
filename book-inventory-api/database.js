const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    quantity INTEGER DEFAULT 0
  );
`;

const createTable = async () => {
    try {
        await pool.query(createTableQuery);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

createTable();

module.exports = {
    query: (text, params, callback) => {
        console.log("QUERY:", text, params || "");
        return pool.query(text, params, callback);
    },
};