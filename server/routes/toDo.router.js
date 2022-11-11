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

// // Adds a new book to the list of awesome reads
// // Request body must be a book object with a title and author.
// router.post('/',  (req, res) => {
//   let newBook = req.body;
//   console.log(`Adding book`, newBook);

//   let queryText = `INSERT INTO "books" ("author", "title")
//     VALUES ($1, $2);`;
//   pool.query(queryText, [newBook.author, newBook.title])
//     .then(result => {
//       res.sendStatus(201);
//     })
//     .catch(error => {
//       console.log(`Error adding new book`, error);
//       res.sendStatus(500);
//     });
// });

// // TODO - PUT
// // Updates a book to show that it has been read
// // Request must include a parameter indicating what book to update - the id
// // Request body must include the content to update - the status
// router.put('/isRead/:id', (req, res) => {
//   const bookID = req.params.id;
//   console.log('isRead update request for id: ', bookID);
//   let queryText = `UPDATE "books" 
//     SET "isRead" = NOT "isRead" 
//     WHERE "id" = $1;`;
//   pool.query(queryText,[bookID])
//   .then( () => {
//     console.log('Update isRead Submitted');
//     res.sendStatus(200);
//   }).catch( (error)=>{
//     console.log('Error update isRead. queryText: ', queryText, ' with error: ', error);
//     res,send
//   })
// })

// // TODO - DELETE 
// // Removes a book to show that it has been read
// // Request must include a parameter indicating what book to update - the id
// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   console.log('delete request id: ', id);
//   const queryText = `DELETE FROM "books"
//   WHERE "id" = $1`;
//   pool.query(queryText, [id])
//   .then( ()=>{
//     console.log('Book deleted');
//     res.sendStatus(200);
//   })
//   .catch( (error) => {
//     console.log(`Error: ${queryText}, error: ${error}`);
//     res.sendStatus(500);
//   })
// })

module.exports = router;