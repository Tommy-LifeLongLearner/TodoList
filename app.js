const todos = [];
const inputElement = document.querySelector("input");
const todosElementsList = document.querySelector("ul");
// add todo
document.querySelector("button").onclick = function() {
  if(!inputElement.value) {
    return;
  }

  const newTodo = {
    value: inputElement.value,
    id: Date.now()
  }
  const newTodoElement = document.createElement("LI");
  newTodoElement.innerHTML = `
  <li>${newTodo.value} <i class="fa fa-edit"></i><i class="fa fa-trash"></i></li>
  `;
  newTodoElement.dataset.todoId = newTodo.id;
  
  todosElementsList.appendChild(newTodoElement);
  todos.push(newTodo);
  inputElement.value = "";
};