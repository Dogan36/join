let currentDraggedElement
let emptyBoxOpen = false

function renderBoard() {
    let containerToDo = document.getElementById('boardContentToDo')
    let containerInProgress = document.getElementById('boardContentInProgress')
    let containerAwaiting = document.getElementById('boardContentAwaiting')
    let containerDone = document.getElementById('boardContentDone')
    clearBoardBeforeRender()
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (element.taskProgress === 'toDo' || element.taskProgress == '') containerToDo.innerHTML += addBoardCard(element, i)
        if (element.taskProgress === 'inProgress') containerInProgress.innerHTML += addBoardCard(element, i)
        if (element.taskProgress === 'awaiting') containerAwaiting.innerHTML += addBoardCard(element, i)
        if (element.taskProgress === 'done') containerDone.innerHTML += addBoardCard(element, i)
    }

}


function clearBoardBeforeRender() {
    document.getElementById('boardContentToDo').innerHTML = ''
    document.getElementById('boardContentInProgress').innerHTML = ''
    document.getElementById('boardContentAwaiting').innerHTML = ''
    document.getElementById('boardContentDone').innerHTML = ''
}



function addBoardCard(element, i) {
    return `
    <div draggable ="true" class="boardCard" ondragstart = "startDragging(${i})" onclick="openActiveTaskOverlay(${i})">
                <div class="boardCardInner">
                    <div class="boardCardCategory" style="background-color:${element.taskCategory.categoryColor}"><span>${element.taskCategory.categorytext}</span></div>
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
            </div>
            `
}


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


function addBoardCardAssignedTo(element) {
    let assignedTo = element.assignedTo;
    return `
    <div class="boardCardAssignedTo">
      ${generateAvatarHtml(assignedTo)}
    </div>
  `;
}


function generateAvatarHtml(assignedTo) {
    let avatarHtml = '';
    if (assignedTo.length === 3) {
        avatarHtml = generateAvatarsHtml(assignedTo, 0, 3);
    } else if (assignedTo.length > 3) {
        const firstTwoAvatarsHtml = generateAvatarsHtml(assignedTo, 0, 2);
        const remainingAvatarsHtml = `<div class="boardAvatar" style="background-color:black"><span>+${assignedTo.length - 2}</span></div>`;
        avatarHtml = firstTwoAvatarsHtml + remainingAvatarsHtml;
    } else {
        avatarHtml = generateAvatarsHtml(assignedTo, 0, assignedTo.length);
    }
    return avatarHtml;
}


function generateAvatarsHtml(assignedTo, startIndex, endIndex) {
    let avatarsHtml = '';
    for (let index = startIndex; index < endIndex; index++) {
        const assignedToIndex = assignedTo[index];
        const backgroundColor = avatarBackgroundColors[assignedTo[index]];
        const contact = contacts[assignedToIndex];
        avatarsHtml += generateAvatarHtmlElement(backgroundColor, contact.initials);
    }
    return avatarsHtml;
}


function generateAvatarHtmlElement(backgroundColor, initials) {
    return `<div class="boardAvatar" style="background-color: ${backgroundColor}"><span>${initials}</span></div>`;
}


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
    <img onclick="closeOverlay()" class="activeTaskCloseButton" src="assets/img/black-x.svg" alt="">
</div>
    `
}


function toogleTaskMove() {
    let container = document.querySelector('.activeTaskMoveContainer');
    if (container.classList.contains('activeTaskMoveContainerOpen')) container.classList.remove('activeTaskMoveContainerOpen')
    else container.classList.add('activeTaskMoveContainerOpen')
}


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


function addActiveCardSubtasks(i) {
    let subtasks = tasks[i].subtasks;
    let subtasksHtml = '';
    for (let index = 0; index < subtasks.length; index++) {
        let subtask = subtasks[index]
        let checkboxId = `active-card-subtask-checkbox-${n}-${index}`;
        subtasksHtml += `
        <div>
        <input id="${checkboxId}" class="checkbox" type="checkbox" ${subtask['subtaskDone'] ? 'checked' : ''} onchange="updateSubtaskDone(this.checked, ${i}, ${index})">
        <label for="${checkboxId}"></label> 
        <div class="activeTaskAssignedTo">
            <span>${subtask.subtaskTitle}</span>
        </div>
        </div>`;
    }
    return subtasksHtml;
}


function moveTo(i, progress) {
    let task = tasks[i]
    task.taskProgress = `${progress}`
    showConfirmation('taskMoved')
    setServer()
    setTimeout(closeConfirmation, 2000)
}


function moveToDrop(progress) {
    let task = tasks[currentDraggedElement]
    task.taskProgress = `${progress}`
    setServer()

}


function startDragging(i) {
    currentDraggedElement = i
}


function allowDrop(ev) {
    ev.preventDefault()
}


function highlightBoardElement(id) {
    document.getElementById(id).classList.add('boardElementContentHighlight')
}

function highlightBoardElementOff(id) {
    document.getElementById(id).classList.remove('boardElementContentHighlight')
}

function findTask() {
    let searchInput = document.getElementById('findTaskInput');


    let searchTerm = searchInput.value.toLowerCase();

    // Alle div-Elemente mit der Klasse "boardCard"
    let boardCards = document.getElementsByClassName('boardCard');

    // Schleife durch alle boardCard-Elemente
    for (let i = 0; i < boardCards.length; i++) {
        let taskNameElement = boardCards[i].querySelector('.boardCardTaskName');
        let taskName = taskNameElement.textContent.toLowerCase();

        // Überprüfen, ob der Task-Name nicht mit dem Suchbegriff beginnt
        if (!taskName.startsWith(searchTerm)) {
            boardCards[i].classList.add('d-none');
        } else {
            boardCards[i].classList.remove('d-none');
        }
    }
}

