let currentDraggedElement
let emptyBoxOpen = false

/**
 * This function clears the board and renders it
 */
function renderBoard() {
    let containerToDo = document.getElementById('boardContentToDo')
    let containerInProgress = document.getElementById('boardContentInProgress')
    let containerAwaiting = document.getElementById('boardContentAwaiting')
    let containerDone = document.getElementById('boardContentDone')
    clearBoardBeforeRender()
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        if (element.taskProgress === 'toDo' || element.taskProgress == '') containerToDo.innerHTML += addBoardCard(element)
        if (element.taskProgress === 'inProgress') containerInProgress.innerHTML += addBoardCard(element)
        if (element.taskProgress === 'awaiting') containerAwaiting.innerHTML += addBoardCard(element)
        if (element.taskProgress === 'done') containerDone.innerHTML += addBoardCard(element)
    }
addContentEmptyDiv()
renderSummary()
}

/**
 * This function clears the tasks from the board
 */
function clearBoardBeforeRender() {
    document.getElementById('boardContentToDo').innerHTML = ''
    document.getElementById('boardContentInProgress').innerHTML = ''
    document.getElementById('boardContentAwaiting').innerHTML = ''
    document.getElementById('boardContentDone').innerHTML = ''
}

/**
 * This function generates html of the task for the board
 * 
 * @param {string} element Json of Task
 * @returns string
 */
function addBoardCard(element) {
    return `
        <div draggable="true" class="boardCard" ondragstart="startDragging(${tasks.indexOf(element)})" onclick="openActiveTaskOverlay(${tasks.indexOf(element)})">
            <div class="boardCardInner">
                <div class="boardCardCategory" style="background-color:${element.taskCategory.categoryColor}">
                    <span class="boardCardCategorySpan">${element.taskCategory.categorytext}</span>
                </div>
                <div class="boardCardContent">
                    <span class="boardCardTaskName">${element.taskTitle}</span>
                    <span class="boardCardTaskDescription">${element.taskDescription}</span>
                </div>
                ${addBoardCardSubtask(element)}
                <div class="boardCardAssign">
                    ${addBoardCardAssignedTo(element)}
                    <img src="${element.prio.iconColor}" alt="">
                </div>
            </div>
        </div>`;
}

/**
 * This function generates board element empty divs if so
 */
function addContentEmptyDiv() {
    let containerToDo = document.getElementById('boardContentToDo');
    let containerInProgress = document.getElementById('boardContentInProgress');
    let containerAwaiting = document.getElementById('boardContentAwaiting');
    let containerDone = document.getElementById('boardContentDone');
    if (containerToDo.innerHTML === '') containerToDo.innerHTML += '<div class="boardElementEmpty">No Tasks To Do</div>';
    if (containerInProgress.innerHTML === '') containerInProgress.innerHTML += '<div class="boardElementEmpty">No Tasks In Progress</div>';
    if (containerAwaiting.innerHTML === '') containerAwaiting.innerHTML += '<div class="boardElementEmpty">No Tasks Awaiting Feedback</div>';
    if (containerDone.innerHTML === '') containerDone.innerHTML += '<div class="boardElementEmpty">No Tasks Done</div>';
}

/**
 * This function generates html with the subtasks total and subtasks done of every task
 * 
 * @param {string} element json of the task
 * @returns string
 */
function addBoardCardSubtask(element) {
    let subtasks = element.subtasks
    if (subtasks.length > 0) {
        let subtasksDoneCounter = 0;
        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i].subtaskDone) {
                subtasksDoneCounter++;
            }
        }
        return `
    <div class="boardCardProgress">
        <progress max="${subtasks.length}" value="${subtasksDoneCounter}"></progress>
        <div><span>${subtasksDoneCounter}</span>/<span>${subtasks.length}</span><span> Done</span></div>
    </div>`
    } else {
        return `<div class="boardCardProgress"></div>`
    }
}
/**
 * This function generats html for the contacts which are assinged to every task
 * 
 * @param {string} element Json of the task
 * @returns string
 */
function addBoardCardAssignedTo(element) {
    let assignedTo = element.assignedTo;
    return `
    <div class="boardCardAssignedTo">
      ${generateAvatarHtml(assignedTo)}
    </div>
  `;
}

/**
 * This function generates the html for the avatars of the users which are assigned to everytask
 * 
 * @param {string} assignedTo This is the array of contacts the task is assigned to
 * @returns string
 */
function generateAvatarHtml(assignedTo) {
    let avatarHtml = '';
    if (assignedTo.length === 3) {
        avatarHtml = generateAvatarsHtml(assignedTo, 3);
    } else if (assignedTo.length > 3) {
        let firstTwoAvatarsHtml = generateAvatarsHtml(assignedTo, 2);
        let remainingAvatarsHtml = `<div class="boardAvatar" style="background-color:black"><span>+${assignedTo.length - 2}</span></div>`;
        avatarHtml = firstTwoAvatarsHtml + remainingAvatarsHtml;
    } else {
        avatarHtml = generateAvatarsHtml(assignedTo, assignedTo.length);
    }
    return avatarHtml;
}

/**
 * This function generates the html for every avartar
 * 
 * @param {*} assignedTo This is the array of contacts the task is assigned to
 * @param {*} endIndex This is the length of how many avatars to be generated
 * @returns string
 */
function generateAvatarsHtml(assignedTo, endIndex) {
    let avatarsHtml = '';
    for (let index = 0; index < endIndex; index++) {
        let assignedToIndex = assignedTo[index];
        let backgroundColor = avatarBackgroundColors[assignedTo[index]];
        let contact = contacts[assignedToIndex];
        avatarsHtml += generateAvatarHtmlElement(backgroundColor, contact.initials);
    }
    return avatarsHtml;
}

/**
 * This function adds background color and initials to the avatar
 * 
 * @param {string} backgroundColor This is the color of the avatar background
 * @param {sting} initials This are the initals of the avatar
 * @returns string
 */
function generateAvatarHtmlElement(backgroundColor, initials) {
    return `<div class="boardAvatar" style="background-color: ${backgroundColor}"><span>${initials}</span></div>`;
}

/**
 * This function generates the html for the active task overlay
 * 
 * @param {number} i This is the index of the task 
 * @returns string
 */
function addActiveTaskOverlayHTML(i) {
    let task = tasks[i]
    return `
    <div class="activeTaskCategory" style="background-color:${task.taskCategory.categoryColor}"><span>${task.taskCategory.categorytext}</span></div>
    <div class="activeTaskTitle">${task.taskTitle}</div>
    <div class="activeTaskDescription">${task.taskDescription}</div>
    <div class="activeTaskDueDate">
        <span>Due date:</span><span>${task.dueDate}</span>
    </div>
    <div class="activeTaskPriority">
        <span>Priority:</span>
        <div class="activeTaskPriorityButton" style="background-color:${task.prio.backgroundColor}"><span>${task.prio.name}</span><img src="${task.prio.iconWhite}" alt=""></div>
    </div>
    <div class="activeTaskAssignedToHeader">Assigned To:</div>
    <div id="activeTaskAssignedToContainer" class="activeTaskAssignedToContainer">
        ${addActiveCardAssignedTo(task)}
    </div>
    <div class="activeTaskAssignedToHeader">Subtasks:</div>
    <div id="activeTaskSubtasksContainer" class="activeTaskSubtasksContainer">
        ${addActiveCardSubtasks(i)}
    </div>
    <div class = "activeTaskChangeContainer">
    <div class = "activeTaskMoveContainer">
    <div class="activeTaskMoveButtonHeader">Move to ...</div>
<div onclick="moveTo(${i}, 'toDo')" class="activeTaskMoveButton">To Do</div>
<div onclick="moveTo(${i}, 'inProgress')" class="activeTaskMoveButton">In Progress</div>
<div onclick="moveTo(${i}, 'awaiting')" class="activeTaskMoveButton">Awaiting Feedback</div>
<div onclick="moveTo(${i}, 'done')" class="activeTaskMoveButton">Done</div>
    </div>
    <div class="activeTaskButtons">
    <div onclick="deleteTask(${i})" onmouseover="hover('activeTaskDelete', 'assets/img/deleteHover.svg')" onmouseout="hover('activeTaskDelete', 'assets/img/delete.svg')" class="activeTaskDelete"><img id="activeTaskDelete" src="assets/img/delete.svg" alt=""></div>
    <div onclick="toogleTaskMove()" onmouseover="hover('activeTaskMove', 'assets/img/moveHover.svg')" onmouseout="hover('activeTaskMove', 'assets/img/move.svg')" class="activeTaskMove"><img id="activeTaskMove" src="assets/img/move.svg" alt=""></div>
    <div onclick="openEditTaskOverlay(${i})" class="activeTaskEdit"><img id="activeTaskEdit" src="assets/img/editTaskPen.svg" alt=""></div>
    </div>
    </div>
    <img onclick="closeOverlay(); renderBoard()" class="activeTaskCloseButton" src="assets/img/black-x.svg" alt="">
</div>
    `
}

/**
 * This function toogles the active task move container
 */
function toogleTaskMove() {
    let container = document.querySelector('.activeTaskMoveContainer');
    if (container.classList.contains('activeTaskMoveContainerOpen')) container.classList.remove('activeTaskMoveContainerOpen')
    else container.classList.add('activeTaskMoveContainerOpen')
}

/**
 * This function generates the html of assigned to for the active task overlay
 * @param {string} task This is the json of the active task
 * @returns string
 */
function addActiveCardAssignedTo(task) {
    let assignedTo = task.assignedTo;
    let avatarHtml = '';
    for (let index = 0; index < assignedTo.length; index++) {
        let assignedToIndex = assignedTo[index]
        let backgroundColor = avatarBackgroundColors[assignedToIndex];
        let contact = contacts[assignedToIndex];
        avatarHtml += ` <div class="activeTaskAssignedTo">
        <div class="activeTaskAvartar" style="background-color: ${backgroundColor}"><span>${contact.initials}</span></div>
        <span>${contact.name}</span></div>`;
    }
    return avatarHtml;
}

/**
 * This function generates the html of subtasks to for the active task overlay
 * @param {number} i This is the index of the active task
 * @returns string
 */
function addActiveCardSubtasks(i) {
    let subtasks = tasks[i].subtasks;
    let subtasksHtml = '';
    for (let index = 0; index < subtasks.length; index++) {
        let subtask = subtasks[index]
        let checkboxId = `active-card-subtask-checkbox-${n}-${index}`;
        subtasksHtml += `
        <div>
        <input id="${checkboxId}" class="checkbox" type="checkbox" ${subtask['subtaskDone'] ? 'checked' : ''} onchange="updateSubtaskDone(this.checked, ${i}, ${index}), setItem('tasks', tasks)">
        <label for="${checkboxId}"></label> 
        <div class="activeTaskAssignedTo">
            <span>${subtask.subtaskTitle}</span>
        </div>
        </div>`;
    }
    return subtasksHtml;
}

/**
 * This function changes the progress of a task
 * 
 * @param {number} i This is the index of the task
 * @param {string} progress This is the name of the progress which the task is changed to
 */
function moveTo(i, progress) {
    let task = tasks[i]
    task.taskProgress = `${progress}`
    showConfirmation('taskMoved')
    setItem('tasks', tasks)
    renderBoard()
    renderSummary()
    setTimeout(closeConfirmation, 2000)
}

/**
 * This function changes the progress of a task on drop
 * 
 * @param {string} progress This is the name of the progress which the task is changed to
 */
function moveToDrop(progress) {
    let task = tasks[currentDraggedElement]
    task.taskProgress = `${progress}`
    setItem('tasks', tasks)
    renderBoard()
    renderSummary()
}
/**
 * This function sets the currentDraggedElement when starting to drag
 * 
 * @param {number} i This is the index of the task
 */
function startDragging(i) {
    currentDraggedElement = i
}

function allowDrop(ev) {
    ev.preventDefault()
}
/**
 * This function highlights the board element content on which is dragged over
 * 
 * @param {string} id This is the id of the element to be highlighted
 */
function highlightBoardElement(id) {
    document.getElementById(id).classList.add('boardElementContentHighlight')
}

/**
 * This function end highlight of board element content when drag over left
 * 
 * @param {string} id This is the id of the element to be highlighted
 */
function highlightBoardElementOff(id) {
    document.getElementById(id).classList.remove('boardElementContentHighlight')
}

/**
 * This function filters the task on board depending on search bar
 */
function findTask() {
    let searchInput = document.getElementById('findTaskInput');
    let searchTerm = searchInput.value.toLowerCase();
    let boardCards = document.getElementsByClassName('boardCard');
    for (let i = 0; i < boardCards.length; i++) {
        let taskName = boardCards[i].querySelector('.boardCardTaskName').textContent.toLowerCase();
        let taskCategory = boardCards[i].querySelector('.boardCardCategorySpan').textContent.toLowerCase();
        let taskDescription = boardCards[i].querySelector('.boardCardTaskDescription').textContent.toLowerCase();
        if (
            !taskName.includes(searchTerm) &&
            !taskCategory.includes(searchTerm) &&
            !taskDescription.includes(searchTerm)
        ) {
            boardCards[i].classList.add('d-none');
        } else {
            boardCards[i].classList.remove('d-none');
        }
    }
}

