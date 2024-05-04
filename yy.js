const todoinput = document.getElementById("todo-input");
const addbtn = document.getElementById("addbtn");
const todoList = document.querySelector(".todo-list");

addbtn.addEventListener('click', addData);
let todos = loadTodos();

function addData() {
    const uniqueId = Math.floor(Math.random() * 99999);
    const todoText = todoinput.value.trim();

    if (todoText !== '') {
        const newTodo = {
            id: uniqueId,
            text: todoText,
            done: false
        };
        todos.push(newTodo);
        saveTodos(todos);
        renderTodos();
        todoinput.value = '';
    }
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todosString = localStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '  <i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', deleteTodo);
        const textSpan = document.createElement('span');
        textSpan.textContent = todo.text;
        todoItem.appendChild(textSpan);
        todoItem.appendChild(deleteButton);
        todoItem.setAttribute('data-id', todo.id);
        if (todo.done) {
            todoItem.classList.add('done');
        }
        todoItem.addEventListener('click', toggleTodo);
        todoList.appendChild(todoItem);
    });
}

function toggleTodo() {
    const id = parseInt(this.getAttribute('data-id'));
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveTodos(todos);
    renderTodos();
}

function deleteTodo() {
    const id = parseInt(this.parentElement.getAttribute('data-id'));
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);
    renderTodos();
}
renderTodos();