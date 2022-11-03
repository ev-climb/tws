const taskBtn = document.querySelector('#add-task-btn');
const taskInput = document.querySelector('#description-task');
const todosWrapper = document.querySelector('.to-do__wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="to-do__item ${task.completed ? 'to-do_type_checked' : ''}">
            <p class="to-do__description">${task.description}</p>
            <div class="to-do__buttons">
                <input class="to-do__complete" onclick="completeTask(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>            
                <button onclick="deleteTask(${index})" class="to-do__delete"></button>
            </div>
        </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];

}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.to-do__item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('to-do_type_checked');
    } else {
        todoItemElems[index].classList.remove('to-do_type_checked');
    }
    updateLocal();
    fillHtmlList();
}

taskInput.addEventListener("input", function(){
    if (taskInput.value !== '') {
        taskBtn.removeAttribute('disabled')
    }
  })

taskBtn.addEventListener('click', (event) => {
    event.preventDefault()
    tasks.push(new Task(taskInput.value));
    updateLocal();
    fillHtmlList();
    taskInput.value ='';
    taskBtn.setAttribute('disabled', 'disabled')
    
})

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

//Таймер

const timer = document.querySelector('.timer__time')
const start = document.querySelector('.timer__play')
const pause = document.querySelector('.timer__pause')
const stop = document.querySelector('.timer__stop')

let hrs = 0
let min = 0
let sec = 0
let t

function tick(){
    sec++
    if (sec >= 60) {
        sec = 0
        min++
        if (min >= 60) {
            min = 0
            hrs++
        }
    }
}

function add() {
    tick()
    timer.textContent = (hrs > 9 ? hrs : "0" + hrs)
                + ":" + (min > 9 ? min : "0" + min)
                + ":" + (sec > 9 ? sec : "0" + sec);
    addTimer()
}

function addTimer() {
    t = setTimeout(add, 1000)
    start.removeEventListener('click', addTimer)
}

// start.onclick = addTimer

start.addEventListener('click', addTimer)


pause.onclick = function() {
    clearTimeout(t)
    start.addEventListener('click', addTimer)
}
stop.onclick = function() {
    clearTimeout(t)
    start.addEventListener('click', addTimer)
    timer.textContent = "00:00:00"
    sec = 0
    min = 0
    hrs = 0
}