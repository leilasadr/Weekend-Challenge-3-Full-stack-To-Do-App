const express = require('express');
const taskRouter = express.Router();

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

// GET
taskRouter.get('/', (req, res) => {
    console.log('in router GET /tasks');
    let sqlText = `
        SELECT * FROM "tasks";
    `;
    pool
        .query(sqlText)
        .then((dbRes) => {
            let tasks = dbRes.rows;
            console.log('the tasks', tasks);
            res.send(tasks);
        })
        .catch((dbErr) => {
            console.log('Could not retrieve tasks from database');
        });
});

// POST
taskRouter.post('/', (req, res) => {
    let newTask = req.body;
    let sqlText = `
    INSERT INTO "tasks"
    ("task")
    VALUES
    ($1)
  `;

    let sqlValues = [newTask.task];

    pool
        .query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log('Post error', dbErr);
            res.sendStatus(500);
        });
});

// DELETE
taskRouter.delete('/:id', (req, res) => {
    console.log(req.params);
    let theIdToDelete = req.params.id;
    let sqlText = `
      DELETE FROM "tasks"
        WHERE "id"=$1;
    `
    let sqlValues = [theIdToDelete]
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('delete /task error:', dbErr);
            res.sendStatus(500);
        })
})



module.exports = taskRouter;