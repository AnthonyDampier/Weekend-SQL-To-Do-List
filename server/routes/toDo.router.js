const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all to do list items
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to-do-table";';
    pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
    })
    .catch(error => {
    console.log('error getting toDoList', error);
    res.sendStatus(500);
    });
});

//POST
router.post('/', (req, res) => {
    const newToDo = req.body;
    console.log(newToDo);
    const queryText = `
	INSERT INTO "to-do-table" 
	("title", "dueDate", "time", "favorite") 
	VALUES ($1,$2,$3,$4);`;

    pool.query(queryText, [newToDo.title, newToDo.date, newToDo.time, newToDo.favorite])
    .then((result) => {
        console.log('POST result from DB', result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in using the router POST to DataBase, ', queryText, 'error is: ', error);
        res.sendStatus(500);
    });
})

//DELETE
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	console.log('Delete request for id: ', id);
	const queryText = `DELETE FROM "to-do-table" WHERE "id" = $1;`;
	pool.query(queryText, [id])
		.then(() => {
			console.log('Task Deleted');
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(`Error DELETEing with query: ${queryText}, error: ${error}`);
			res.sendStatus(500);
		})
})

//PUT
router.put('/:id', (req, res) => {
    console.log('In put /:id');
	const toDoID = req.params.id;
	let queryReady = `UPDATE "to-do-table" 
        SET "readyForTransfer" = NOT "readyForTransfer" 
        
        
        WHERE "id" = $1;`;
	pool.query(queryReady, [koalaID]).then(() => {
		console.log('Koala ID:', koalaID, 'has been updated to ready for transfer.');
		res.sendStatus(200);
	}).catch((error) => {
		console.log('Error with marking koala ready:', error);
		res.sendStatus(500);
	});
});

module.exports = router;