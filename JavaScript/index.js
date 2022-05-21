var input = fEl('.text-input');
var list = fEl('.todo-list');

input.addEventListener('keyup', handleAddTodo);

var localBase = JSON.parse(window.localStorage.getItem('todoslist'));
var toDoItem = localBase ? localBase : [];

function creatingToDoItems(value) {
    var elLi = addTag('li');
    elLi.className = 'd-flex align-items-center my-1 rounded shadow-sm py-2 px-3 border list-item';
    var elInput = addTag('input');
    elInput.className = "form-check-input m-0 ms-0";
    elInput.type = 'checkbox';
    var elP = addTag('p');
    elP.className = "container__item-text ms-1 m-0 me-auto";
    elP.textContent = value.title;
    var editBtn = addTag('button');
    editBtn.className = 'btn btn-success ms-auto';
    editBtn.textContent = 'Edit';
    var deleteBtn = addTag('button');
    deleteBtn.className = 'btn btn-danger ms-1';
    deleteBtn.textContent = 'Delete'
    
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
        var addedItem = {
            id: uuid.v4(),
            title: evt.target.value,
            isCompleted: false
        }
        toDoItem.unshift(addedItem);

        window.localStorage.setItem('todoslist', JSON.stringify(toDoItem));

        console.log(toDoItem);

        render(toDoItem)
        input.value = null;
    }
}
render(toDoItem);