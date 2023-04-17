console.log("Let's do some tasks!");

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    // Establish Click Listeners
    $('#addButton').on('click', createTasks);
    $('#taskList').on('click','#deleteButton', deleteTask);
    $('#taskList').on('click', '#completeButton', updateStatus);

    // load existing tasks on page load
  getTasks();
}

function createTasks(event) {
    event.preventDefault();
    console.log('in addButton on click');
    // get user input and put in an object
    // using a test object
    let taskToSend = $('#taskIn').val()
    // call newTask with the new obejct
    freshTask(taskToSend);
  }

  function freshTask(newTask) {
    console.log('in newTask');
    // ajax call to server to get tasks
    $.ajax({
      method: 'POST',
      url: '/tasks',
      data: {
        task: newTask
      }
    }).then(function (response) {
      console.log(response);
      $('#taskList').empty();
      getTasks()
    }).catch(function (error) {
      console.log('there was an error posting tasks');
    })
  }

  function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get tasks
    $.ajax({
      method: 'GET',
      url: '/tasks'
    }).then(function (response) {
      console.log('GOT our tasks!', response)
      // need function to append tasks to the DOM
      $('#taskList').empty();

      appendTasks(response)
    }).catch(function (error) {
      console.log('Could not GET tasks at this time! Try again later.')
    })
  
  }
  
  function appendTasks(taskArray) {
    for (let task of taskArray) {
      let taskItem = $('#taskList').append(`
      <li data-id=${task.id}>
      <button id="deleteButton">Delete</button>
      <button id="completeButton">Complete</button>
      ${task.task}    
      </li>
      `)
      let taskClass ;
      if (task.completed) {
        taskClass = 'completed';
        taskItem.css('background-color', 'green');
      }
      $('#taskList').append(taskItem);
    }
    }
  

  function deleteTask() {
    let idToDelete = $(this).parent().data('id');
    console.log(idToDelete);
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${idToDelete}`
    }).then(function (response) {
      getTasks();
    }).catch(function(error) {
        alert('something broke');
      })
  }

  function updateStatus() {
    let idToUpdate = $(this).parent().data('id');
    let taskItem = $(this).closest('li');
    console.log(idToUpdate);
    $.ajax({
      method: 'PUT',
      url: `/tasks/${idToUpdate}`,
    }).then(function (response) {
      taskItem.css('background-color', 'green');
      getTasks()
    }).catch(function (error) {
      console.log('Update Failed:', error);
    })
  }

