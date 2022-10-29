const todos = localStorage.todos ? JSON.parse(localStorage.todos) : [];
const inputElement = document.querySelector("input");
const todosElementsList = document.querySelector("ul");
const addButton = document.querySelector("#add-button");
const saveButton = document.querySelector("#save-button");

todos.forEach(todo => {
  const newTodoElement = document.createElement("LI");
  newTodoElement.dataset.todoId = todo.id;
  newTodoElement.innerHTML = `
    <div class="content">
      ${todo.value}
    </div>
    <div class="buttons">
      <i class="fa fa-edit"></i>
      <i class="fa fa-trash"></i>
    </div>
  `;
  todo.done && newTodoElement.classList.add("completed");
  todosElementsList.appendChild(newTodoElement);
});

// add todo
addButton.onclick = function() {
  if(!inputElement.value) {
    return;
  }

  const newTodo = {
    value: inputElement.value,
    id: Date.now(),
    done: false
  }
  const newTodoElement = document.createElement("LI");
  newTodoElement.innerHTML = `
    <div class="content">
      ${newTodo.value}
    </div>
    <div class="buttons">
      <i class="fa fa-edit"></i>
      <i class="fa fa-trash"></i>
    </div>
  `;
  newTodoElement.dataset.todoId = newTodo.id;
  
  todosElementsList.appendChild(newTodoElement);
  todos.push(newTodo);
  inputElement.value = "";
  updateLocalStorage();
};

document.querySelector("ul").onclick = function(e) {
  const liElement = e.target.closest("li");
  e.target.className.match(/edit/) ? editTodo(liElement) : 
    e.target.className.match(/trash/) ? deleteTodo(liElement) : null;
};

document.querySelector("ul").ondblclick = function(e) {
  const completedTodoElement = e.target.closest("li");
  if(!completedTodoElement) {
    return;
  }

  const completedTodoItem = todos.find(todo => todo.id == completedTodoElement.dataset.todoId);
  completedTodoItem.done = !completedTodoItem.done;
  completedTodoElement.classList.toggle("completed");
  updateLocalStorage();
};

function editTodo(todoElement) {
  inputElement.value = todoElement.textContent.trim();
  saveButton.dataset.editedTodoId = todoElement.dataset.todoId;
  addButton.hidden = true;
  saveButton.hidden = false;
}

saveButton.onclick = function() {
  const editedTodoId = saveButton.dataset.editedTodoId;
  const editedTodoItem = todos.find(todo => todo.id == editedTodoId);
  editedTodoItem.value = inputElement.value;
  addButton.hidden = false;
  saveButton.hidden = true;
  const editedTodoElement = Array.prototype.find.call(document.querySelectorAll(`li`), li => li.dataset.todoId === editedTodoId);
  editedTodoElement.querySelector(".content").textContent = inputElement.value;
  inputElement.value = "";
  updateLocalStorage();
}

function deleteTodo(todoElement) {
  const removedTodoId = todoElement.dataset.todoId;
  const removedTodoItemIndex = todos.findIndex(todo => todo.id == removedTodoId);
  todoElement.remove();
  todos.splice(removedTodoItemIndex, 1);
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.todos = JSON.stringify(todos);
}