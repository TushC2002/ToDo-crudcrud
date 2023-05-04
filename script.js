const form = document.querySelector('#todo-form');
const remainingList = document.querySelector('#todo-remaining');
const completedList = document.querySelector('#todo-completed');
const apiURL = 'https://crudcrud.com/api/93ac5e5c2f9349799f5f108e96af465f/TodoAdmin';

// Function to create a todo item and add it to the remaining list
async function addTodoItem(name, description) {
  const todo = { name, description };
  try {
    const response = await axios.post(apiURL, todo);
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
  } catch (error) {
    console.error(error);
  }
}

// Function to move a todo item from the remaining list to the completed list
async function moveTodoItem(id, name, description) {
  const todo = { name, description };
  try {
    const response = await axios.put(`${apiURL}/${id}`, todo);
    const li = document.createElement('li');
    li.innerHTML = `${todo.name}: ${todo.description}`;
    completedList.appendChild(li);
  } catch (error) {
    console.error(error);
  }
}

// Function to delete a todo item
async function deleteTodoItem(id, li) {
  try {
    const response = await axios.delete(`${apiURL}/${id}`);
    remainingList.removeChild(li);
  } catch (error) {
    console.error(error);
  }
}

// Submit form event listener
form.addEventListener('submit', async event => {
  event.preventDefault();
  const nameInput = document.querySelector('#todo-name');
  const descriptionInput = document.querySelector('#todo-desc');
  await addTodoItem(nameInput.value, descriptionInput.value);
  nameInput.value = '';
  descriptionInput.value = '';
});
