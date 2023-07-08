document.addEventListener("DOMContentLoaded", function() {
    var taskForm = document.getElementById("taskForm");
    var taskList = document.getElementById("taskList");
    var tasks = [];

    // Retrieve tasks from local storage
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        displayTasks();
    }

    // Add event listener to the task form
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var taskInput = document.getElementById("taskInput");
        var taskText = taskInput.value.trim();

        if (taskText !== "") {
            var task = {
                text: taskText,
                completed: false
            };

            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            taskInput.value = "";
        }
    });

    // Add event listener to the task list to handle task completion and deletion
    taskList.addEventListener("change", function(event) {
        var checkbox = event.target;
        var index = checkbox.dataset.index;
        tasks[index].completed = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    });

    taskList.addEventListener("click", function(event) {
        var deleteButton = event.target;
        if (deleteButton.classList.contains("delete")) {
            var taskItem = deleteButton.parentNode;
            var index = taskItem.dataset.index;
            var taskText = tasks[index].text;
            
            if (confirm("Are you sure you want to delete this task: " + taskText + "?")) {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            }
        }
    });

    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            var taskItem = document.createElement("li");
            taskItem.dataset.index = index;

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.dataset.index = index;
            checkbox.checked = task.completed;

            var taskTextElement = document.createElement("span");
            taskTextElement.textContent = task.text;

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskTextElement);
            taskItem.appendChild(deleteButton);

            if (task.completed) {
                taskItem.classList.add("completed");
            }

            taskList.appendChild(taskItem);
        });
    }
});
