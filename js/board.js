function renderBoard() {
//renderToDos()
////renderInProgress()
//renderAwaiting()
//renderDone()
}

function renderToDos(){
    let toDos = tasks.filter(task => task.taskProgress === "to do")
    let container = document.getElementById('boardElement')
    console.log(toDos)
    for (let i = 0; i < toDos.length; i++) {
        const element = toDos[i];
        container.innerHTML+= addBoardCard(element)
    }
}

function addBoardCard(element){
    return `
    <div class="boardCard">
                <div class="boardCardInner">
                    <div class="boardCardCategory"><span>${element.taskCategory.categorytext}</span></div>
                    <div class="boardCardContent">
                        <span class="boardCardTaskName">Website Redesign</span>
                        <span class="boardCardTaskDescription">Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ipsa voluptate consectetur dicta hic provident nobis laborum asperiores
                            v</span>
                    </div>
                    <div class="boardCardProgress">
                        <progress max="2" value="1"></progress>
                        <div><span>1</span>/<span>2</span><span> Done</span></div>
                    </div>
                    <div class="boardCardAssign">
                        <div class="boardCardAssignedTo">
                            <div class="boardAvatar"><span>DC</span></div>
                            <div class="boardAvatar"><span>AB</span></div>
                        </div>
                        <img src="./assets/img/boardLowIcon.svg" alt="">
                    </div>
                </div>
            </div>
    `
}
function renderInProgress(){
    let inProgress = tasks.filter(task => task.taskProgress === "in progress")
    console.log(inProgress)
}

function renderAwaiting(){
    let awaiting = tasks.filter(task => task.taskProgress === "awaiting")
console.log(awaiting)
}


function renderDone(){
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