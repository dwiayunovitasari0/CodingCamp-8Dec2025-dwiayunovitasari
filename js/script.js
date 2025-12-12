let todo = [];

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    if (todoInput.value === "" || todoDate.value === "") {
        alert("Please fill in both the todo item and the date.");
        return;
    }

    const todoObj = {
        task: todoInput.value,
        date: todoDate.value,
        completed: false
    };

    todo.push(todoObj);
    renderTodos();

    todoInput.value = "";
    todoDate.value = "";
}

function resetTodos() {
    todo = [];
    renderTodos();
}

// EDIT TODO
function editTodo(index) {
    const newTask = prompt("Edit task:", todo[index].task);
    const newDate = prompt("Edit date (yyyy-mm-dd):", todo[index].date);

    if (newTask && newDate) {
        todo[index].task = newTask;
        todo[index].date = newDate;
        renderTodos();
    }
}

// DELETE TODO
function deleteTodo(index) {
    todo.splice(index, 1);
    renderTodos();
}

// CHANGE STATUS
function toggleStatus(index) {
    todo[index].completed = !todo[index].completed;
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    if (todo.length === 0) {
        todoList.innerHTML = `
        <tr>
            <td colspan="4" class="empty">No task found</td>
        </tr>`;
        return;
    }

    todo.forEach((item, index) => {
        todoList.innerHTML += `
            <tr>
                <td>${item.task}</td>
                <td>${item.date}</td>
                <td>
                    <span class="status ${item.completed ? "done" : "pending"}">
                        ${item.completed ? "Done" : "Pending"}
                    </span>
                </td>
                <td>
                    <button class="btn-action bg-blue-500" onclick="editTodo(${index})">Edit</button>
                    <button class="btn-action bg-green-500" onclick="toggleStatus(${index})">
                        ${item.completed ? "Undo" : "Done"}
                    </button>
                    <button class="btn-action bg-red-500" onclick="deleteTodo(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}
