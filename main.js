let todoInput = document.querySelector("#new-todo");
let form = document.querySelector("#form");
let chooseAll = document.querySelector("#choose-all");
let counter = document.querySelector(".counter");
let statsContainer = document.querySelector(".stats-container");
let checkList = document.querySelector(".checklist");
let filterButtons = document.querySelectorAll('.filter-item');
let clearCompletedButton = document.querySelector("#clear-completed-button");
let allChecked = false;
let count = 0;
 
form.addEventListener('submit', addToDo);
checkList.addEventListener('click', deleteTodo);
chooseAll.addEventListener('mousedown', markAllTodos);
clearCompletedButton.addEventListener('click', deleteAllCompleted);
checkList.addEventListener('change', markTodo);
 
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterStatus = button.id.replace('-button', '');
 
        filterTodoList();
 
    });
});
 
function updateCounter() {
    let uncheckedTodos = document.querySelectorAll('.li-checkbox:not(:checked)');
    count = uncheckedTodos.length;
    counter.textContent = `${count} Items left`;
}
 
function resetCounter() {
    let allTodos = document.querySelectorAll('.checklist li');
    count = allTodos.length;
    counter.textContent = `${count} Items left`;
}
 
function addToDo(event) {
    event.preventDefault();
 
    if (todoInput.value.trim() !== '') {
 
        chooseAll.style.display = "inline-block";
        chooseAll.textContent = "❯"
 
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
 
        removeButton.textContent = '🗙';
        removeButton.classList.add('remove-button');
        newTodo.append(removeButton);
 
        checkList.append(newTodo);
 
        statsContainer.style.display = "flex";
        todoInput.value = '';
    }
 
    updateCounter();
 
}
 
function markAllTodos() {
    let allaCheckboxes = document.querySelectorAll('.li-checkbox');
    allaCheckboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;
    });
 
    allChecked = !allChecked;
 
    if (allChecked) {
        clearCompletedButton.style.display = "flex";
        updateCounter(); // Återställ räkningen när du markerar alla
       
    }
    else {
        clearCompletedButton.style.display = "none";
        resetCounter();
    }
}
 
function handleCompletedButton() {
 
    let markedTodos = document.querySelectorAll('.checklist li.completed');
    clearCompletedButton.style.display = markedTodos.length > 0 ? 'flex' : 'none';
 
}
 
function handleStatsContainerAndChooseAll() {
    let remainingTodos = document.querySelectorAll('.checklist li');
    if (remainingTodos.length === 0) {
        statsContainer.style.display = "none";
        chooseAll.style.display = 'none';
    }
}
 
function deleteTodo(event) {
    let removeTodo = event.target;
 
    if (removeTodo.classList.contains('remove-button')) {
        removeTodo.parentNode.remove();
    }
 
    updateCounter();
    handleStatsContainerAndChooseAll();
}
 
function deleteAllCompleted() {
    let allItems = document.querySelectorAll('.checklist li');
 
    allItems.forEach((item) => {
        let checkbox = item.querySelector('.li-checkbox');
 
        if (checkbox.checked) {
            item.remove();
        }
    });
 
    updateCounter();
 
    handleCompletedButton();
    handleStatsContainerAndChooseAll();
}
 
function markTodo(event) {
    let checkbox = event.target;
    let todo = checkbox.parentElement;
    todo.classList.toggle('completed');
 
    handleCompletedButton();
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
 
//Kvar att göra:
//fixa bugg med countern-Veronica - klar
//Övrigt: Ställa in CSS, exempelvis stryka över färdiga anteckningar -Oskar
//skriva tester-Veronica
//responsive-Oskar/Veronica