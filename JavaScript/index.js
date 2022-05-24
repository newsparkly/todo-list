let container = fEl('.container');
let input = fEl('.text-input');
let list = fEl('.todo-list');

input.addEventListener('keyup', handleAddTodo);

let deleteToDo = (evt) => {
    let filteredList = [];
    for (let i = 0; i < toDoItem.length; i++) {
        if (toDoItem[i].id !== evt.target.dataset.id){
            filteredList.push(toDoItem[i])
        }
    }

    localStorage.setItem('todoslist', JSON.stringify(filteredList));
    toDoItem = filteredList;
    render(filteredList);
}

function creatingToDoItems(value) {
    let elLi = addTag('li');
    elLi.className = 'd-flex align-items-center my-1 rounded shadow-sm py-2 px-3 border list-item';
    let elInput = addTag('input');
    elInput.className = "form-check-input m-0 ms-0 checkbox";
    elInput.type = 'checkbox';
    let elP = addTag('p');
    elP.className = "container__item-text ms-1 m-0 me-auto";
    elP.textContent = value.title;
    let editBtn = addTag('button');
    editBtn.className = 'btn btn-success ms-auto edit';
    editBtn.textContent = 'Edit';
    editBtn.dataset.id = value.id;
    let deleteBtn = addTag('button');
    deleteBtn.className = 'btn btn-danger ms-1 delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = value.id;
    
    elLi.append(elInput);
    elLi.append(elP);
    elLi.append(editBtn);
    elLi.append(deleteBtn);
    list.appendChild(elLi);
}

function render (array) {
    list.innerHTML = null;
    for (let i = 0; i < array.length; i++) {
        creatingToDoItems(array[i])
    }
}

function handleAddTodo (evt) {
    if(evt.keyCode === 13) {
        if(evt.target.value == '') {
            return alert(`Please fill out the task!`);
        } else {var addedItem = {
            id: uuid.v4(),
            title: evt.target.value,
            isCompleted: false}
        }
        
        toDoItem.unshift(addedItem);
        
        window.localStorage.setItem('todoslist', JSON.stringify(toDoItem));
        
        render(toDoItem)
        input.value = null;
    }
}

let editerBtn = fEl('.edit');
function editTodoItem (evt) {
    for (let i = 0; i < toDoItem.length; i++) {
        if (toDoItem[i].id == evt.target.dataset.id){
            let editedValue = prompt('Edit the todo!', toDoItem[i].title);
            if (!editedValue){
                return alert(`You have not entered a name!`);
            } else {
                toDoItem[i].title = editedValue;
            }
            window.localStorage.clear;
            window.localStorage.setItem('todoslist', JSON.stringify(toDoItem));
        }
    }        
    render(toDoItem)
}

list.addEventListener('click', (evt) => {
    if(evt.target.matches(`.delete`)) {
        deleteToDo(evt)
    } else if (evt.target.matches('.edit')) {
        editTodoItem(evt)
    }
})

let localBase = window.localStorage.getItem('todoslist');
let toDoItem = localBase ? JSON.parse(localBase) : [];

render(toDoItem);