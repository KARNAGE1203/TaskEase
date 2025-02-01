document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();
});

function fetchTasks() {
    fetch("/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Clear existing tasks

            tasks.forEach(task => {
                let li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = `
                    <span><strong>${task.title}</strong>: ${task.description}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        });
}

function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => fetchTasks());
}

function editTask(id, currentTitle, currentDescription) {
    const newTitle = prompt("Enter new task title:", currentTitle);
    const newDescription = prompt("Enter new task description:", currentDescription);
    
    if (newTitle && newDescription) {
        fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTitle, description: newDescription })
        })
        .then(response => response.json())
        .then(() => fetchTasks());
    }
}