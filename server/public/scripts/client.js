$(document).on(onReady());
    
function onReady(){
    console.log('jQuery sourced.');
    refreshToDoList();
    $('#enter-btn').on('click', addToDo);
    
};

function addToDo(){
    console.log('button enter');
    // grab values
    title = $('#text-input').val();
    console.log(title);
    date = $('#date-input').val();
    console.log(date);
    time = $('#time-input').val();
    console.log(time);
    favorite = false;
    // PUT object route to DB
    newToDo = {
        title: title,
        date: date,
        time: time,
        favorite: favorite
    }
    console.log(newToDo)
    $.ajax({
		method: 'POST',
		url: '/toDo',
		data: newToDo
	}).then(function (response) {
		console.log('...back from POSTING to DataBase');
		//console.log(‘This is what was sent to DB: ‘, response);
		$('#text-input').val('');
		$('#date-input').val('');
		$('#time-iput').val('');
		refreshToDoList();
	}).catch(function (error) {
		alert('SaveKoala function has failed to POST to DataBase!');
	});
}

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
        console.log(toDo.time);
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
                    value="${(Date(toDo.dueDate)).slice(0, 15).replace('T', ' ')}"
                    readonly>
                <input
                    type="time"
                    class="time"
                    value="${toDo.time}"
                    readonly>
                <button class="edit" data-index="${i}" data-id="${toDo.id}">Edit</button>
                <button class="delete" data-id="${toDo.id}">Delete</button>
            </div> 
    `);
    }
}