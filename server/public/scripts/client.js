$(document).on(onReady());
    
function onReady(){
    console.log('jQuery sourced.');
    refreshToDoList();
    $('#enter-btn').on('click', addToDo);
    $('.to-do-list').on('click', '.delete-btn', deleteTask);
    $('.to-do-list').on('click', '.edit-btn', editTask);
};

function editTask(){
    console.log('in editTask()');
    //remove read only from object
    console.log('inner text ',$(this).text());
    const id = $(this).data("id");
    //console.log(id);
    const dateInputID = '#date_' + id;
    //console.log(dateString);
    const titleInputID = '#title_' + id;
    const timeInputID = '#time_' + id;
    if ($(this).text() === "edit") {
        console.log('edit.text() = edit')
        //.log($(`${titleInputID}`).val());
        $(`${titleInputID}`).attr("readonly", false);
        $(`${dateInputID}`).attr("readonly", false);
        $(`${dateInputID}`).attr("type", 'date');
        $(`${timeInputID}`).attr("readonly", false);
        $(this).text('save');
    } 
    else if ($(this).text() === "save") {
        $(`${titleInputID}`).attr("readonly", true);
        $(`${dateInputID}`).attr("readonly", true);
        $(`${dateInputID}`).attr("type", 'text');
        $(`${timeInputID}`).attr("readonly", true);
        $(this).text('edit');
        //save attributes update
        
    } else {
        console.log("Improper button innerHTML (EDIT/SAVE)");
    }
}

function deleteTask(){
    console.log('in deleteTask()');
    taskID = $(this).data('id');
    console.log('ID for delete: ', taskID);
    if(confirm('Are you sure you want to delete the task??')){
        $.ajax({
            method: 'DELETE',
            url: `/toDo/${taskID}`
        })
        .then(function () {
            refreshToDoList();
        })
        .catch(function (error) {
            alert(`Delete Function Error: ${error}`);
        });
    }
}

function addToDo(){
    console.log('button enter');
    // grab values
    title = $('#text-input').val();
    console.log(title);
    date = $('#date-input').val();
    console.log(date);
    time = $('#time-input').val();
    console.log(time);
    favorite = $('#favorite-selector').val();
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
		$('#time-input').val('');
		refreshToDoList();
	}).catch(function (error) {
		alert('addToFunction function has failed to POST to DataBase!', error);
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
                <label id="favorite-toggle">
                ${toDo.favorite ? '⭐️' : '👎🏽'}
                <input 
                    type="text" 
                    class="text" 
                    id="title_${toDo.id}"
                    value="${toDo.title}"
                    readonly >
                <input 
                    type="text"
                    class="date"
                    id="date_${toDo.id}"
                    value="${(Date(toDo.dueDate)).slice(0, 15).replace('M', ' ')}"
                    readonly >
                <input
                    type="time"
                    class="time"
                    id="time_${toDo.id}"
                    value="${toDo.time}"
                    readonly >
                <button class="edit-btn" data-index="${i}" data-id="${toDo.id}">edit</button>
                <button class="delete-btn" data-id="${toDo.id}">delete</button>
            </div> 
    `);
    }
}