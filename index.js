$(document).ready(function () {
    // Load tasks on page load
    loadTasks();
  
    // Make task list sortable (drag-and-drop)
    $('#taskList').sortable({
      update: function () {
        saveTasks();
      }
    });
  
    // Add new task
    $('#addTask').click(function () {
      let task = $('#taskInput').val().trim();
      if (task !== '') {
        addTaskToList(task, false);
        $('#taskInput').val('');
        saveTasks();
      }
    });
  
    // Mark task as complete
    $('#taskList').on('click', 'li', function () {
      $(this).toggleClass('completed');
      saveTasks();
    });
  
    // Delete task
    $('#taskList').on('click', '.delete', function (e) {
      e.stopPropagation();
      $(this).parent().remove();
      saveTasks();
    });
  
    // Function to add task to DOM
    function addTaskToList(taskText, completed) {
      const completedClass = completed ? 'completed' : '';
      $('#taskList').append(`<li class="${completedClass}">${taskText} <span class="delete">✖</span></li>`);
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      const tasks = [];
      $('#taskList li').each(function () {
        tasks.push({
          text: $(this).text().replace('✖', '').trim(),
          completed: $(this).hasClass('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Load tasks from localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        tasks.forEach(task => {
          addTaskToList(task.text, task.completed);
        });
      }
    }
  });
  