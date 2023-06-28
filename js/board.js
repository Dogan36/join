function renderBoard() {

    let containerToDo = document.getElementById('boardContentToDo')
    let containerInProgress = document.getElementById('boardContentInProgress')
    let containerAwaiting = document.getElementById('boardContentAwaiting')
    let containerDone = document.getElementById('boardContentDone')
    clearBoardBeforeRender()
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


function clearBoardBeforeRender(){
    document.getElementById('boardContentToDo').innerHTML='';
    document.getElementById('boardContentInProgress').innerHTML='';
    document.getElementById('boardContentAwaiting').innerHTML='';
    document.getElementById('boardContentDone').innerHTML='';

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
            let assignedToIndex = assignedTo[index]
            let backgroundColor = avatarBackgroundColors[assignedTo[index]];
            let contact = contacts[assignedToIndex];
           
            avatarHtml += `<div class="boardAvatar" style="background-color: ${backgroundColor}"><span>${contact.initials}</span></div>`;
        }
    } else if (assignedTo.length > 3) {
        for (let index = 0; index < 2; index++) {
            let assignedToIndex = assignedTo[index]
            let backgroundColor = avatarBackgroundColors[assignedTo[index]];
            let contact = contacts[assignedToIndex];
            avatarHtml += `<div class="boardAvatar" style="background-color: ${backgroundColor}"><span>${contact.initials}</span></div>`;
        }
        avatarHtml += `<div class="boardAvatar" style="background-color:black"><span>+${assignedTo.length - 2}</span></div>`;
    } else {
        for (let index = 0; index < assignedTo.length; index++) {
            let assignedToIndex = assignedTo[index]
            let backgroundColor = avatarBackgroundColors[assignedTo[index]];
            let contact = contacts[assignedToIndex];
            avatarHtml += `<div class="boardAvatar" style="background-color: ${backgroundColor}"><span>${contact.initials}</span></div>`;
        }
    }

    return avatarHtml;
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
    <div class="activeTaskButtons">
        <div onmouseover="hover(activeTaskDelete, 'assets/img/deleteHover.svg')" onmouseout="hover(activeTaskDelete, 'assets/img/delete.svg')" class="activeTaskDelete"><img id="activeTaskDelete" src="assets/img/delete.svg" alt=""></div>
        <div onmouseover="hover(activeTaskMove, 'assets/img/moveHover.svg')" onmouseout="hover(activeTaskMove, 'assets/img/move.svg')" class="activeTaskMove"><img id="activeTaskMove" src="assets/img/move.svg" alt=""></div>
        <div class="activeTaskEdit"><img id="activeTaskEdit" src="assets/img/editTaskPen.svg" alt=""></div>
    </div>
    <img onclick="closeOverlay()" class="activeTaskCloseButton" src="assets/img/black-x.svg" alt="">
</div>

    `
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

function addActiveCardSubtasks(i){
  
    let subtasks = tasks[i].subtasks;
    let subtasksHtml = '';
    for (let index = 0; index < subtasks.length; index++) {
        let subtask = subtasks[index]
        let checkboxId = `active-card-subtask-checkbox-${n}-${index}`;
        console.log(index)
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
