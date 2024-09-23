const inputbox = document.getElementById('inputbox');
const listContainer = document.getElementById('list-container');
const span = document.querySelector('span');

async function additems() {
  if (inputbox.value === "") {
    alert('plese enter something');
  } else {
    const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputbox.value }),
    });
    const newTodo = await response.json();
    let li = document.createElement('li');
    li.textContent = inputbox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
    li.setAttribute('draggable', true);
    li.id = 'todo-' + Date.now();
  }
  inputbox.value = '';
  savData()
}

inputbox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      additems();
    }
});

listContainer.addEventListener('click', function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle('checked');
  }

  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
  savData();
}, false);

function savData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}
showTask();




listContainer.addEventListener('dragstart', drag);
listContainer.addEventListener('dragover', (ev) => ev.preventDefault());
listContainer.addEventListener('drop', drop);

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var dropzone = ev.target.closest('ol');
    
    if (dropzone && draggedElement) {
        var closestElement = getClosestElement(dropzone, ev.clientY);
        
        if (closestElement) {
            dropzone.insertBefore(draggedElement, closestElement);
        } else {
            dropzone.appendChild(draggedElement);
        }
        
        updateTodoStatus(draggedElement, dropzone);
    }
    saveTodos();
}

function getClosestElement(container, mouseY) {
    const elements = Array.from(container.children);
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveTodos() {
    const todos = Array.from(todoList.children).concat(Array.from(listContainer.children)).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
    }));
    socket.emit('saveTodos', todos);
}

function loadTodos() {
    socket.emit('getTodos');
}

socket.on('todosLoaded', (todos) => {
    todoList.innerHTML = '';
    listContainer.innerHTML = '';
    todos.forEach(todo => {
        const li = createTodoItem(todo.text);
        li.id = 'todo-' + todoCounter++;
        if (todo.completed) {
            li.classList.add('completed');
            li.querySelector('.complete-button').textContent = 'Geri Al';
            li.querySelector('.complete-button').onclick = function() { uncompleteTodo(this); };
            listContainer.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });
});

socket.on('todosUpdated', (todos) => {
    loadTodos();
});

window.addEventListener('load', loadTodos);