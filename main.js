let todoInput = document.querySelector("#new-todo");
let form = document.querySelector("#form");
let chooseAll = document.querySelector("#choose-all");
let counter = document.querySelector(".counter");
let statsContainer = document.querySelector(".stats-container");
let checkList = document.querySelector(".checklist");
let filterButtons = document.querySelectorAll('.filter-item');
let clearCompletedButton = document.querySelector("#clear-completed-button");
let allChecked = false;

form.addEventListener('submit', addToDo);
checkList.addEventListener('click', deleteTodo);
chooseAll.addEventListener('mousedown', markAllTodos);
clearCompletedButton.addEventListener('click', deleteAllCompleted);
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterStatus = button.id.replace('-button', '');

        filterTodoList();

    });
});

function updateCounter() {
    let uncheckedTodos = document.querySelectorAll('.checklist li:not(.completed) .li-checkbox:not(:checked)');
    let count = uncheckedTodos.length;
    counter.textContent = `${count} Items left`;
}

function addToDo(event) {
    event.preventDefault();

    chooseAll.style.display = "block";
    chooseAll.textContent = "🔽"


    if (todoInput.value.trim() !== '') {
        let newTodo = document.createElement('li');
        let checkbox = document.createElement('input');
        let removeButton = document.createElement('button');
        let textNode = document.createElement('p');

        checkbox.type = 'checkbox';
        checkbox.classList.add('li-checkbox');
        newTodo.append(checkbox);

        //här skapas texten
        textNode.textContent = todoInput.value.trim();
        newTodo.append(textNode);

        removeButton.textContent = '❌';
        removeButton.classList.add('remove-button');
        newTodo.append(removeButton);

        checkList.append(newTodo);

        statsContainer.style.display = "flex";
        // Nollställ värden i sökfältet
        todoInput.value = '';
    }

    updateCounter();

}

//metod för att markera alla todos
function markAllTodos() {
    let allaCheckboxes = document.querySelectorAll('.li-checkbox');
    allaCheckboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;
    });

    allChecked = !allChecked;

    if (allChecked) {
        clearCompletedButton.style.display = "flex";
    }
    else {
        clearCompletedButton.style.display = "none";
    }

    updateCounter();

}

//metod för att ta bort EN todo
function deleteTodo(event) {
    let removeTodo = event.target;

    if (removeTodo.classList.contains('remove-button')) {
        removeTodo.parentNode.remove();
    }

    updateCounter();
};

function deleteAllCompleted() {
    let allItems = document.querySelectorAll('.checklist li');

    allItems.forEach((item) => {
        let checkbox = item.querySelector('.li-checkbox');

        if (checkbox.checked) {
            item.remove();
        }
    });

    updateCounter();
}

//metod för att filtrera färdiga anteckningar
//och ej färdiga anteckningar
function filterTodoList() {

    let allItems = document.querySelectorAll('.checklist li');

    allItems.forEach((item) => {
        let checkbox = item.querySelector('.li-checkbox');

        switch (filterStatus) {

            case "All":
                item.style.display = "flex";
                break;
            case 'active':
                item.style.display = checkbox.checked ? 'none' : 'flex';
                break;
            case 'completed':
                item.style.display = checkbox.checked ? 'flex' : 'none';
                break;
            default:
                item.style.display = 'flex';
        }

    });

    updateCounter();
}

//Metoder kvar:
//Ta bort alla anteckningar checkade anteckningar
//Övrigt: Ställa in CSS, exempelvis stryka över färgida anteckningar
//skriva tester
//responsive