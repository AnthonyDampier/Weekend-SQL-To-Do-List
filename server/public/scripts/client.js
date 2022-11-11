$(document).on(onReady());
    
function onReady(){
    console.log('jQuery sourced.');
    refreshToDoList();
};

function refreshToDoList() {
    console.log('refresh to do list');
    $.ajax({
    type: 'GET',
    url: '/toDo'
    }).then(function(response) {
        console.log(response);
        renderToDoList(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
}

function renderToDoList(toDoList) {
    $('.to-do-list').empty();

    for(let i = 0; i < toDoList.length; i += 1) {
        let toDo = toDoList[i];
        console.log(toDo);
      // For each book, append a new row to our table
        $('.to-do-list').append(`
        <div class="task">
                <input 
                    type="text" 
                    class="text" 
                    value="${toDo.title}"
                    readonly>
                <input 
                    type="text"
                    class="date"
                    value="${toDo.dueDate}"
                    readonly>
                <button class="edit" data-index="${i}" data-id="${toDo.id}">Edit</button>
                <button class="delete" data-id="${toDo.id}">Delete</button>
            </div> 
    `);
    }
}

//   function deleteBook(){
//     console.log('in deleteBook()');
//     const bookID = $(this).data('id');
//     $.ajax({
//       method: 'DELETE',
//       url: `/books/${bookID}`
//     })
//     .then( function() {
//       refreshBooks();
//     }).catch( function(error){
//       alert(`deleteBook errored: ${error}`);
//     });
//   }
  
//   function isReadBook(){
//     //toggle is read in database to true
//     console.log('in isReadBook()');
//     const bookID = $(this).data('id');
  
//     $.ajax({
//       method: 'PUT',
//       url: `/books/isRead/${bookID}`,
//     }).then( function (){
//       refreshBooks();
//     }).catch( function(error){
//       console.log('Error in isReadBook ', error);
//     })
//   }