const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


// reports various sorts query to be rendered to DOM
router.get('/sort/:sortDecision', (req, res) => {
    const sort = req.params.sortDecision;
    console.log('how query will request sort:', sort);
    let querySort= ''
    switch (sort){
        case 'importance': console.log('in importance switch');
            querySort = `"favorite" DESC`
            break;
        case 'dueDate': console.log('in dueDate switch');
            querySort = `"dueDate"`
            break;
        case 'isCompleted': console.log('in isCompleted switch');
            querySort = `"isCompleted" DESC`;
            break;
        default:
            //console.log('Sort by: ', sort.sortby);
            //let queryText = 'SELECT * FROM "to_do_list" ORDER BY "id";';
            
    }
    let queryText = 'SELECT * FROM "to_do_list" ORDER BY' + querySort;
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
        })
        .catch(error => {
        console.log('error getting toDoList', error);
        res.sendStatus(500);
        });
});

// reports all to_do_list objects
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to_do_list" ORDER BY "id";';
    pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
    })
    .catch(error => {
    console.log('error getting toDoList', error);
    res.sendStatus(500);
    });
});

//SORT


//POST
router.post('/', (req, res) => {
    const newToDo = req.body;
    console.log(newToDo);
    const queryText = `
	INSERT INTO "to_do_list" 
	("title", "dueDate", "time", "favorite", "isCompleted") 
	VALUES ($1,$2,$3,$4,$5);`;

    pool.query(queryText, [newToDo.title, newToDo.date, newToDo.time, newToDo.favorite, newToDo.isCompleted])
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
	const queryText = `DELETE FROM "to_do_list" WHERE "id" = $1;`;
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

//PUT toggle isCompleted for specific id /toDo/isCompleted/${id}`,
router.put('/isCompleted/:id', (req, res) => {
    const id = req.params.id;
    console.log('id of target: ', id);
    let queryReady = `UPDATE "to_do_list"
        SET "isCompleted" = NOT "isCompleted"
        WHERE "id" = $1;`;
    
    pool.query(queryReady, [id]).then(() => {
        console.log('toDo ID:', id, 'had favorite updated and ready for refresh.');
		res.sendStatus(200);
	}).catch((error) => {
		console.log('Error with updating isCompleted:', error);
		res.sendStatus(500);
	});
});

//PUT toggle importance /toDo/favorite/${id}
router.put('/favorite/:id', (req, res) => {
    const id = req.params.id;
    console.log('id of target: ', id);
	let queryReady = `UPDATE "to_do_list" 
        SET "favorite" = NOT "favorite"
        WHERE "id" = $1;`;

	pool.query(queryReady, [id]).then(() => {
		console.log('toDo ID:', id, 'had favorite updated and ready for refresh.');
		res.sendStatus(200);
	}).catch((error) => {
		console.log('Error with saving edited task:', error);
		res.sendStatus(500);
	});
});

//PUT edit
router.put('/:id', (req, res) => {
    console.log('In put /:id');
	const saveObject = req.body; 
    ////////// parcel out variable
    let saveID = saveObject.id;
    let title = saveObject.title;
    let dueDate = saveObject.dueDate;
    let time = saveObject.time;
    console.log(saveObject);
    
	let queryReady = `UPDATE "to_do_list" 
        SET "title" = $1,
        "dueDate" = $2,
        "time" = $3
        WHERE "id" = $4;`;
	pool.query(queryReady, [title, dueDate, time, saveID]).then(() => {
		console.log('toDo ID:', saveID, 'has been updated to ready for transfer.');
		res.sendStatus(200);
	}).catch((error) => {
		console.log('Error with saving edited task:', error);
		res.sendStatus(500);
	});
});

module.exports = router;