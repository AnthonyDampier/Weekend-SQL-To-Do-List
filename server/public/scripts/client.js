$(document).on(onReady());
    
function onReady(){
    console.log('jQuery sourced.');
    refreshToDoList();
    $('#enter-btn').on('click', addToDo);
    $('.to-do-list').on('click', '.delete-btn', deleteTask);
    $('.to-do-list').on('click', '.edit-btn', editTask);
    $('.to-do-list').on('click', 'label', toggleImportance);
    $('.to-do-list').on('click', '.complete-btn', markComplete);
    $('#sort-selector-btn').on('click', sortBy);
};

function sortBy(){
    console.log('in sortBy');
    console.log('Sorting by: ', $('#sort-selector').val());
    sortBy = $('#sort-selector').val();
    sortBy = { sortBy: sortBy}

    $.ajax({
        method: 'GET',
		url: `/toDo/sort`,
        data: saveEdit
    }).then(function(response) {
        //console.log(response);
        renderToDoList(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
}
function markComplete(){
    const id = $(this).data('id');
    console.log(id);
    //has attribute checked
    $.ajax({
		method: 'PUT',
		url: `/toDo/isCompleted/${id}`,
	}).then(function () {
		console.log(`Todo #${id} isCompleted toggle in DB`);
		refreshToDoList();
	}).catch(function (error) {
		alert(`markReady function failure:`, error);
	});
}

function toggleImportance(){
    //allows user to change toggle imptance by clicking stars
    console.log('in toggleImportance');
    id = $(this).data('id');
    console.log('ID of to do item: ', id);

    $.ajax({
		method: 'PUT',
		url: `/toDo/favorite/${id}`,
	}).then(function () {
		console.log(`Todo #${id} importance toggle in DB`);
		//refreshToDoList();
	}).catch(function (error) {
		alert(`markReady function failure:`, error);
	});
}

function editTask(){
    console.log('in editTask()');
    //remove read only from object
    //console.log('inner text ',$(this).text());
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
        //$(`${dateInputID}`).attr("type", 'date');
        $(`${timeInputID}`).attr("readonly", false);
        $(`${titleInputID}`).addClass("editing");
        $(`${dateInputID}`).addClass("editing");
        $(`${dateInputID}`).addClass("editing");
        $(`${timeInputID}`).addClass("editing");
        $(this).text('save');
        $(this).addClass("save-btn");
    } 
    else if ($(this).text() === "save") {
        $(`${titleInputID}`).attr("readonly", true);
        $(`${dateInputID}`).attr("readonly", true);
        $(`${timeInputID}`).attr("readonly", true);
        $(`${titleInputID}`).removeClass("editing");
        $(`${dateInputID}`).removeClass("editing");
        $(`${dateInputID}`).removeClass("editing");
        $(`${timeInputID}`).removeClass("editing");
        $(this).text('edit');
        $(this).removeClass("save-btn");
        //create data to transfer
        editedTask = {
            id: id,
            title: $(`${titleInputID}`).val(),
            dueDate: $(`${dateInputID}`).val(),
            time: $(`${timeInputID}`).val()
            //favorite: $(`${favID}`).val()
        }
        console.log('Edited tasked values: ',editedTask)
        //save attributes update
        saveEdit(editedTask);
    } else {
        console.log("Improper button innerHTML (EDIT/SAVE)");
    }
}

function saveEdit(saveEdit) {
	const id = $(this).data("id");
	console.log('In saving edit working with ID#', id);
	$.ajax({
		method: 'PUT',
		url: `/toDo/${id}`,
        data: saveEdit
	}).then(function () {
		console.log(`Todo #${id} is ready to go.`);
		refreshToDoList();
	}).catch(function (error) {
		alert(`markReady function failure:`, error);
	});
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
    const title = $('#text-input').val();
    //console.log(title);
    const date = $('#date-input').val();
    //console.log(date);
    const time = $('#time-input').val();
    //console.log(time);
    const favorite = $('#favorite-selector').val();
    // PUT object route to DB
    const isCompleted = false;
    newToDo = {
        title: title,
        date: date,
        time: time,
        favorite: favorite,
        isCompleted: isCompleted
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
        //console.log(response);
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
        //console.log(toDo.time);
        toDo.dueDate = 
      // For each book, append a new row to our table
        $('.to-do-list').append(`
        <div class="task">
                <label id="favorite-toggle" data-id="${toDo.id}" value=${toDo.favorite}>
                ${toDo.favorite ? '⭐️' : ' ✩ '}
                </label>
                <input 
                    type="text" 
                    class="text ${toDo.isCompleted ? 'complete' : 'not-complete'}"" 
                    id="title_${toDo.id}"
                    value="${toDo.title}"
                    readonly >
                <input 
                    type="date"
                    class="date ${toDo.isCompleted ? 'complete' : 'not-complete'}""
                    id="date_${toDo.id}"
                    value="${toDo.dueDate.slice(0, 10).replace('T', ' ')}"
                    readonly >
                <input
                    type="time"
                    class="time ${toDo.isCompleted ? 'complete' : 'not-complete'}""
                    id="time_${toDo.id}"
                    value="${toDo.time}"
                    readonly >

                <button class="complete-btn ${toDo.isCompleted ? 'complete' : 'not-complete'}" 
                data-index="${i}" data-id="${toDo.id}">${toDo.isCompleted ? '✓' : '◼️'}</button>

                <button class="edit-btn" data-index="${i}" data-id="${toDo.id}">edit</button>
                <button class="delete-btn" data-id="${toDo.id}">delete</button>
            </div> 
    `);
    }
}