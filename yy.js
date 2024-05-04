const todoinput = document.getElementById("input");
const addbtn = document.getElementById("btn");
const todoList = document.querySelector(".list");

addbtn.addEventListener('click', addData);
let todos = store();

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
        save(todos);
        conclus();
        todoinput.value = '';
    }
}

function save(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function store() {
    const todosString = localStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
}

function conclus() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', deletedata);
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
    save(todos);
    conclus();
}

function deletedata() {
    const id = parseInt(this.parentElement.getAttribute('data-id'));
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);
    conclus();
}
conclus();
