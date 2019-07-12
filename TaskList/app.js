const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {

    // LOAD TASKS ON DOM EVENT
    document.addEventListener('DOMContentLoaded', function () {        
            let tasks;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            tasks.forEach(function (task) {
                    const li = document.createElement('li');
                    li.className = 'collection-item';
                    li.appendChild(document.createTextNode(task));
                    const link = document.createElement('a');
                    link.className = 'delete-item secondary-content';
                    link.innerHTML = '<i class="fa fa-remove"></i>';
                    li.appendChild(link);
                    // console.log(li);
                    taskList.appendChild(li);
                });
    });

    //ADD TASK EVENT
    form.addEventListener('submit', function (e) {
        if(taskInput.value === '')
        {
            alert('Add a task');
        }    
        else {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(taskInput.value));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            // console.log(li);
            taskList.appendChild(li);
    
            //STORAGE
            storeTaskInLocalStorage(taskInput.value);
    
            taskInput.value = '';
            e.preventDefault();
        }


    });

    //LOAD TASK IN LOCAL STORAGE
    function storeTaskInLocalStorage(task) {
        let tasks;
        // console.log(task);
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
            // console.log(tasks);
        }
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(taskItem) {
        // console.log(taskItem);
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function (task,index) {
            if(taskItem.textContent === task){
             tasks.splice(index,1);
            }
        });

        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    function clearAllFromLocalStorage(){
        localStorage.clear();
    }

    //REMOVE TASK
    taskList.addEventListener('click', function (e) {
            if (e.target.parentElement.classList.contains('delete-item')) {
                // console.log(e.target);
                if (confirm('Are you sure ?')) {
                    e
                        .target
                        .parentElement
                        .parentElement
                        .remove();

                        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                }
            }
    });

    //CLEAR TASKS
    clearBtn.addEventListener('click', function () {
        // taskList.innerHTML=''; or
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearAllFromLocalStorage();
    });

    // FILTER TASKS
    filter.addEventListener('keyup', function (e) {
        const searchText = e
            .target
            .value
            .toLowerCase();
        document
            .querySelectorAll('.collection-item')
            .forEach(function (task) {
                const item = task.firstChild.textContent;
                // console.log(task.firstChild.textContent);
                if (item.toLowerCase().indexOf(searchText) != -1) {
                    task.style.display = 'block';
                } else {
                    task.style.display = 'none';
                }
            });
    });

}