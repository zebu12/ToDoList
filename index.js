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
    // Edit on double-click
  $('#taskList').on('dblclick', 'li', function () {
    const $li = $(this);
    if ($li.find('input').length) return; // Already editing

    const currentText = $li.clone().children().remove().end().text().trim();

    const $input = $('<input type="text">').val(currentText).addClass('edit-input');
    $li.html($input).append('<span class="delete">✖</span>');
    $input.focus();

    // Save on Enter or blur
    $input.on('keydown', function (e) {
      if (e.key === 'Enter') {
        finishEdit($li, $input.val());
      } else if (e.key === 'Escape') {
        finishEdit($li, currentText);
      }
    });

    $input.on('blur', function () {
      finishEdit($li, $input.val());
    });
  });

  function finishEdit($li, newText) {
    const isCompleted = $li.hasClass('completed');
    $li.html(`${newText} <span class="delete">✖</span>`);
    if (isCompleted) $li.addClass('completed');
    saveTasks();
  }
  // Theme toggle
    $('#toggleTheme').click(function () {
    $('body').toggleClass('dark');
    const isDark = $('body').hasClass('dark');
    $(this).text(isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  
  // Load theme on start
    const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
    $('body').addClass('dark');
    $('#toggleTheme').text('Switch to Light Mode');
  }
  
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
  