function renderBoard() {
    renderToDos()
    ////renderInProgress()
    //renderAwaiting()
    //renderDone()
}

function renderToDos() {
    let toDos = tasks.filter(task => task.taskProgress === "toDo")
    let container = document.getElementById('boardContentToDo')
    console.log(toDos)
    for (let i = 0; i < toDos.length; i++) {
        const element = toDos[i];
        container.innerHTML += addBoardCard(element)
    }
}

function addBoardCard(element) {
    return `
    <div class="boardCard">
                <div class="boardCardInner">
                    <div class="boardCardCategory" style="background-color:${element.taskCategory.categoryColor}"><span>${element.taskCategory.categorytext}</span></div>
                    <div class="boardCardContent">
                        <span class="boardCardTaskName">${element.taskTitle}</span>
                        <span class="boardCardTaskDescription">${element.taskDescription}</span>
                    </div>
                    ${addBoardCardSubtask(element)}
                    
                    <div class="boardCardAssign">
                    ${addBoardCardAssignedTo(element)}
                        
                        <img src="./assets/img/boardLowIcon.svg" alt="">
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
    }else{
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




function renderInProgress() {
    let inProgress = tasks.filter(task => task.taskProgress === "in progress")
    console.log(inProgress)
}

function renderAwaiting() {
    let awaiting = tasks.filter(task => task.taskProgress === "awaiting")
    console.log(awaiting)
}


function renderDone() {
    let done = tasks.filter(task => task.taskProgress === "done")
    console.log(done)

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