const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList(){
  let todoListHTML = '';

  todoList.forEach(todoObject => {
    const {name, dueDate} = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  // console.log(todoListHTML);

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) =>{
      deleteButton.addEventListener('click', () => {
        todoList.splice(index,1);
        renderTodoList();
        saveToStorage();
      });
    });
}

document.querySelector('.js-add-todo-button').addEventListener('click',() => {
  addTodo();
});

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');;
  const dueDate = dateInputElement.value;

  //  console.log(name);

  todoList.push({
    // name: name,
    // dueDate: dueDate
    name,
    dueDate
});

  inputElement.value = '';

  renderTodoList();

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
