const form = document.querySelector('#todo-form');
const remainingList = document.querySelector('#todo-remaining');
const completedList = document.querySelector('#todo-completed');
const apiURL = 'https://crudcrud.com/api/da063cff37d4429fbcfeaac1012980e1/TodoAdmin';

// Function to create a todo item and add it to the remaining list
function addTodoItem(name, description) {
  const todo = { name, description };
  axios.post(apiURL, todo)
    .then(response => {
      const li = document.createElement('li');
      li.innerHTML = `${response.data.name}: ${response.data.description}`;
      const doneButton = document.createElement('button');
      doneButton.innerHTML = 'done';
      doneButton.addEventListener('click', () => {
        moveTodoItem(response.data._id, response.data.name, response.data.description);
      });
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'delete';
      deleteButton.addEventListener('click', () => {
        deleteTodoItem(response.data._id, li);
      });
      li.appendChild(doneButton);
      li.appendChild(deleteButton);
      remainingList.appendChild(li);
    })
    .catch(error => console.error(error));
}

// Function to move a todo item from the remaining list to the completed list
function moveTodoItem(id, name, description) {
  const todo = { name, description };
  axios.put(`${apiURL}/${id}`, todo)
    .then(response => {

    //   const li = document.createElement('li');
    //   li.innerHTML = `${response.data.name}: ${response.data.description}`;
    //   completedList.appendChild(li);
        const li = document.createElement("li");
        li.innerHTML = `${todo.name}: ${todo.description}`;
        completedList.appendChild(li);
    })
    .catch(error => console.error(error));
}

// Function to delete a todo item
function deleteTodoItem(id, li) {
  axios.delete(`${apiURL}/${id}`)
    .then(response => {
      remainingList.removeChild(li);
    })
    .catch(error => console.error(error));
}

// Submit form event listener
form.addEventListener('submit', event => {
  event.preventDefault();
  const nameInput = document.querySelector('#todo-name');
  const descriptionInput = document.querySelector('#todo-desc');
  addTodoItem(nameInput.value, descriptionInput.value);
  nameInput.value = '';
  descriptionInput.value = '';
});

