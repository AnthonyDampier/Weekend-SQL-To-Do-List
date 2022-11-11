const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all to do list items
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "To_Do_List";';
    pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
    })
    .catch(error => {
    console.log('error getting toDoList', error);
    res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const newToDo = req.body;
    const queryText = `
	INSERT INTO "koala-table" 
	("title", "date", "time", "favorite"); 
	VALUES ($1,$2,$3,$4);`;

    pool.query(queryText, [newToDo.title, newToDo.time, newToDo.favorite])
    .then((result) => {
        console.log('POST result from DB', result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in using the router POST to DataBase, ', queryText, 'error is: ', error);
        res.sendStatus(500);
    });
})

module.exports = router;