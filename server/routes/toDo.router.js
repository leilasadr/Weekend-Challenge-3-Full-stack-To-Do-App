const express = require('express');
const toDoRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    host: 'localhost',
    post: 5432,
    database: 'weekend-to-do-app',
});

pool.on('connect', () => {
    console.log('connected to postgres database :');
});

pool.off('error', (error) => {
    console.log('failure to connect to the database', error);
});


module.exports = toDoRouter;