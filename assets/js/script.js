const nuevoId = () => Math.random().toString(16).slice(10)
let tasks = [
    { id: nuevoId(), description: "Cambiar medidor", isCompleted: false },
    { id: nuevoId(), description: "Cambiar llave de paso", isCompleted: false },
    { id: nuevoId(), description: "entrega de cartas", isCompleted: false }
]

const tbodyTasks = document.querySelector("#tareas");
const description = document.querySelector("#input-description");
const taskTotal = document.querySelector("#tareas-totales");
const taskCompleted = document.querySelector("#tareas-completas");

const toggleCompleted = (id) => {
    const taskIndexSelected = tasks.findIndex(task => task.id === id);
    tasks[taskIndexSelected].isCompleted = !tasks[taskIndexSelected].isCompleted
    renderTable();
    calculateTotalTasks();
}


const addTask = () => {
    tasks.push({
        id: nuevoId(),
        description: description.value,
        isCompleted: false,
    });

    renderTable();
    calculateTotalTasks();
    clearFocusDescription();
}


const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTable();
    calculateTotalTasks();
}

const calculateTotalTasks = () => {
    taskTotal.innerHTML = tasks.length
    let completed = 0;
    for (let task of tasks) {
        if (task.isCompleted) { completed++ }
    }
    taskCompleted.innerHTML = completed
}

const renderTable = () => {
    let trHtml = ""
    for (let task of tasks) {
        trHtml += `
        <tr>
            <td>${task.id}</td>
            <td id="td-${task.id}" ${task.isCompleted && 'class="text-line"'}>${task.description}</td>
            <td><input onclick="toggleCompleted('${task.id}')" type="checkbox" ${task.isCompleted && 'checked'}></td>
            <td><button onclick="deleteTask('${task.id}')">✖️</button></td>
        </tr>
        `
    }
    tbodyTasks.innerHTML = trHtml;
}

const clearFocusDescription = ()=>{
    description.value = "";
    description.focus();
}

renderTable();
calculateTotalTasks();
clearFocusDescription();