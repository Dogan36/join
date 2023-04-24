function renderBoard() {

    let containerToDo = document.getElementById('boardContentToDo')
    let containerInProgress = document.getElementById('boardContentInProgress')
    let containerAwaiting = document.getElementById('boardContentAwaiting')
    let containerDone = document.getElementById('boardContentDone')
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (element.taskProgress === 'toDo') {
            containerToDo.innerHTML += addBoardCard(element, i)
        }
        if (element.taskProgress === 'inProgress') {
            containerInProgress.innerHTML += addBoardCard(element, i)
        }
        if (element.taskProgress === 'awaiting') {
            containerAwaiting.innerHTML += addBoardCard(element, i)
        }
        if (element.taskProgress === 'done') {
            containerDone.innerHTML += addBoardCard(element, i)
        }
    }

}




function addBoardCard(element, i) {
    return `
    <div class="boardCard" onclick="openActiveTaskOverlay(${i})">
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
        for (let index = 0; index < assignedTo.length; index++) {
            const contact = assignedTo[index];
            avatarHtml += `<div class="boardAvatar"><span>${contact.initials}</span></div>`;
        }
    } else if (assignedTo.length > 3) {
        for (let index = 0; index < 2; index++) {
            const contact = assignedTo[index];
            avatarHtml += `<div class="boardAvatar"><span>${contact.initials}</span></div>`;
        }
        avatarHtml += `<div class="boardAvatar" style="background-color:black"><span>+${assignedTo.length - 2}</span></div>`;
    } else {
        for (let index = 0; index < assignedTo.length; index++) {
            const contact = assignedTo[index];
            avatarHtml += `<div class="boardAvatar"><span>${contact.initials}</span></div>`;
        }
    }

    return avatarHtml;
}

/**
 * Opens the Add Task pop-up window in the board page. (Öffnet das Pop up Fenster Add Task in der board Seite.)
 */
function popUpWindowaddTask() {
    document.getElementById('container-opened-task').classList.remove('d-none');
    document.getElementById('add-task-window').classList.remove('d-none');
}

/**
 * Closes the Add Task pop-up window in the board page. (Schließt das Pop up Fenster Add Task in der board Seite.)
 */
function popUpWindowCloseAddTask() {
    document.getElementById('container-opened-task').classList.add('d-none');
    document.getElementById('add-task-window').classList.add('d-none');
}

function openActiveTaskOverlay(i) {
    let activeTask = tasks[i];
    document.getElementById('activeTaskOverlay').innerHTML = addActiveTaskOverlayHTML(i)

    document.getElementById('container-opened-task').classList.remove('d-none');
    document.getElementById('activeTaskOverlay').classList.remove('d-none')
}

function addActiveTaskOverlayHTML(i) {
    let task = tasks[i]
    return `
    <div class="activeTaskOverlay">
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
    <div id="activeTaskAssignedToContainer">
      
        ${addActiveCardAssignedTo(task)}
       
    </div>
    <div class="activeTaskButtons">
        <div onmouseover="hover(activeTaskDelete, 'assets/img/deleteHover.svg')" onmouseout="hover(activeTaskDelete, 'assets/img/delete.svg')" class="activeTaskDelete"><img id="activeTaskDelete" src="assets/img/delete.svg" alt=""></div>
        <div onmouseover="hover(activeTaskMove, 'assets/img/moveHover.svg')" onmouseout="hover(activeTaskMove, 'assets/img/move.svg')" class="activeTaskMove"><img id="activeTaskMove" src="assets/img/move.svg" alt=""></div>
        <div class="activeTaskEdit"><img id="activeTaskEdit" src="assets/img/editTaskPen.svg" alt=""></div>
    </div>
    <img onclick="closeOverlay()" class="activeTaskCloseButton" src="assets/img/black-x.svg" alt="">
</div>
</div>
    `
}

function addActiveCardAssignedTo(task) {
    let assignedTo = task.assignedTo;
    let avatarHtml = '';
 
    for (let index = 0; index < assignedTo.length; index++) {
        const contact = assignedTo[index];
        avatarHtml += ` <div class="activeTaskAssignedTo">
        <div class="activeTaskAvartar"><span>${contact.initials}</span></div>
        <span>${contact.name}</span></div>`;
    }
    
    return avatarHtml;
  
}