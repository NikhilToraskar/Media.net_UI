//Dragula for Drag and Drop
let prevParent = null;

dragula([
    document.getElementById("toDo"),
    document.getElementById("inProgress"),
    document.getElementById("inReview"),
    document.getElementById("done")
],
    {
        moves: function (el) {
            prevParent = el.parentNode.getAttribute('id');
            return true;
        },
    }).on('drop', function (el) {
        moveData(prevParent, el.getAttribute('id'), el.parentNode.getAttribute('id'));
    });

const moveData = (prevID, elementID, currentID) => {
    let singleTask = data[prevID].filter(x => {
        return x.id == elementID;
    })[0];
    if (singleTask) {
        data[currentID].push(singleTask);
        data[prevID].splice(data[prevID].indexOf(singleTask), 1);
        localStorage.setItem('taskData', JSON.stringify(data));
    }
}

//Variable for Entire task data
let data = null;
//Variable to set localstorage
let taskData = localStorage.getItem('taskData');

//Display for first time user
if (!taskData) {
    let tempData = {
        'toDo': [],
        'inProgress': [],
        'inReview': [],
        'done': [],
        totalCount: 0
    }
    localStorage.setItem('taskData', JSON.stringify(tempData));
    data = tempData;
} else {
    //show the localstorage data
    data = JSON.parse(taskData);
}

//function addData()
const addData = () => {
    let form = document.getElementById('addForm');
    //ID for taskData
    data.totalCount = data.totalCount + 1;
    let task = {
        id: 'Task' + data.totalCount,
        title: form.elements.namedItem('title').value,
        description: form.elements.namedItem('description').value,
        username: form.elements.namedItem('username').value,
        userImg: form.elements.namedItem('userSelect').value
    }
    data['toDo'].push(task);
    localStorage.setItem('taskData', JSON.stringify(data));
}

//function getTask()
const getTask = () => {
    //single task key value pair
    for (const [key, value] of Object.entries(data)) {
        let task = "";
        for (let list = 0; list < data[key].length; list++) {
            task += `<div class="bounded-task rounded-sm medium-priority" id="${data[key][list].id}">
            <h3 class="task-name">${data[key][list].title}</h3>
            <div class="task-desc">
                <p>${data[key][list].description}</p>
                <span>By ${data[key][list].username}</span>
            </div>
            <div class="task-details d-flex justify-content-between 
                align-items-center">
                <div class="task-inner-details">
                    <a href="#" class="task-date rounded-sm">
                        <span>
                            <i class="far fa-bell"></i>Oct, 23
                        </span>
                    </a>
                    <a href="#" class="task-comment rounded-sm">
                        <span>
                            <i class="far fa-comment"></i>4
                        </span>
                    </a>
                    <a href="#" class="task-comment rounded-sm">
                        <span>
                            <i class="fas fa-paperclip"></i>3
                        </span>
                    </a>
                </div>
                <div class="task-inner-users d-flex">
                    <div class="task-user rounded-sm overflow-hidden">
                        <img src="${data[key][list].userImg}"
                            class="img-fluid w-100" />
                    </div>
                </div>
            </div>
        </div>`
        }
        if (document.getElementById(key)) {
            document.getElementById(key).innerHTML = task;
            // console.log(task);
        }
    }
}
//Get Task Data function
getTask();

//Mobile Menu Toggle

const menuAnim = () => {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("mainPanel").classList.toggle("active");
    document.getElementById("topBar").classList.toggle("active");
}

document.getElementById("sidebarToggleTop").addEventListener("click", menuAnim)
