$(document).ready(function () {
    // Add a new task
    $("#addTask").click(function(){
        let task = $('#taskInput').val().trim();
        if (task != '') {
            $('#taskList').append('<li>${task} <span class="delete"> X </span></li>');
            $('#taskInput').val('');
        }
    });

    
    // Toggle task complete
  $('#taskList').on('click', 'li', function () {
    $(this).toggleClass('completed');
  });

  // Delete a task
  $('#taskList').on('click', '.delete', function (e) {
    e.stopPropagation(); // prevents toggle when clicking delete
    $(this).parent().remove();
  });
});