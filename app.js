const todos = [];
const inputElement = document.querySelector("input");
const todosElementsList = document.querySelector("ul");
const addButton = document.querySelector("#add-button");
const saveButton = document.querySelector("#save-button");
// add todo
addButton.onclick = function() {
  if(!inputElement.value) {
    return;
  }

  const newTodo = {
    value: inputElement.value,
    id: Date.now()
  }
  const newTodoElement = document.createElement("LI");
  newTodoElement.innerHTML = `
    ${newTodo.value}<i class="fa fa-edit"></i><i class="fa fa-trash"></i>
  `;
  newTodoElement.dataset.todoId = newTodo.id;
  
  todosElementsList.appendChild(newTodoElement);
  todos.push(newTodo);
  inputElement.value = "";
};

document.querySelector("ul").onclick = function(e) {
  e.target.className.match(/edit/) ? editTodo(e.target.parentElement) : 
    e.target.className.match(/trash/) ? deleteTodo(e.target.parentElement) : null;
};

function editTodo(todoElement) {
  inputElement.value = todoElement.textContent;
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
  editedTodoElement.innerHTML = `
    ${inputElement.value}<i class="fa fa-edit"></i><i class="fa fa-trash"></i>
  `;
  editedTodoElement.dataset.dataTodoId = editedTodoId;
  inputElement.value = "";
}