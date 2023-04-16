console.log("Let's do some tasks!");

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    // Establish Click Listeners
    $('#addButton').on('click', setupClickListeners);

    // load existing tasks on page load
  getTasks();
}

function setupClickListeners() {
    console.log('in addButton on click');
    // get user input and put in an object
    // using a test object
    let taskToSend = {
      name: $('#taskIn').val(),
    };
    // call newTask with the new obejct
    newTask(taskToSend);
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
      $('#taskList').append(`
      <li data-id=${task.id}>
      ${task.task}    
      </li>
      `)
    }
  }