/**
 * This function opens the new subtask container
 */
function openSubtask() {
    document.getElementById(`addNewSubtaskContainer${n}`).classList.add('d-none');
    document.getElementById(`newSubtaskContainer${n}`).classList.remove('d-none');
}

/**
 * This function closes the new subtask container
 */
function closeSubtask() {
    document.getElementById(`addNewSubtaskContainer${n}`).classList.remove('d-none');
    document.getElementById(`newSubtaskContainer${n}`).classList.add('d-none');
}

/**
 * This function checks if new subtask input isn´t empty an adds new subtask to subtasks
 */
function addNewSubtask() {
    let newSubtaskInput = document.getElementById(`newSubtaskPoint${n}`);
    if (newSubtaskInput.value !== '') {
        let newSubtask = {
            'subtaskTitle': newSubtaskInput.value,
            'subtaskDone': false
        }
        subtasks.push(newSubtask)
        newSubtaskInput.value = '';
        renderSubtasks()
    }
}

/**
 * This function saves the edited subtask
 * 
 * @param {number} i This is the index of the Subtask to be edited
 */
async function saveEditedSubtask(j) {
    let newSubtaskInput = document.getElementById(`subTaskEditContent${n}${j}`);
    if (newSubtaskInput.value !== '') {
        let newSubtask = {
            'subtaskTitle': newSubtaskInput.value,
            'subtaskDone': false
        }
        subtasks.splice(j, 1, newSubtask)
        await setItem('tasks', tasks);
        newSubtaskInput.value = '';
        renderSubtasks()
    }
}

/**
 * This function deletes a subtask
 * 
 * @param {number} i This is the index of the subtask to be deleted
 */
function deleteSubtask(j) {
    subtasks.splice(j, 1)
    renderSubtasks()
}

/**
 * This function checkes if new added subtask is already done and add that info to subtask
 * 
 * @param {Boolean} checked This is the info if subtask checkbox is checked or not
 * @param {number} i This is the index of the task
 * @param {number} index This is the index of the subtask
 */
async function updateSubtaskDone(checked, i, index) {
    tasks[i].subtasks[index]['subtaskDone'] = checked;
    await setItem('tasks', tasks)
    renderBoard()
}

/**
* This function resets the subtasks
*/
function resetSubtasks() {
    subtasks = []
}

/**
 * This function renders html to subtask container
 */
function renderSubtasks() {
    let subtasksContainer = document.getElementById(`addTaskSubtaskPoint${n}`);
    subtasksContainer.innerHTML = '';
    for (let j = 0; j < subtasks.length; j++) {
        let subtask = subtasks[j];
        subtasksContainer.innerHTML += `
        <div id="checkboxContainer${n}${j}" class="subtaskContainer">
          <div id="subtaskContainerValue${n}${j}">${subtask['subtaskTitle']}</div>
          <div class="subtaskEdit"><img onclick = "openEditSubtask(${j})" class="taskEditSubtaskImg" src="assets/img/editTaskPenBlack.svg"><span style="color:#cecece">|</span><img onclick = "deleteSubtask(${j})" class="taskEditSubtaskImg" src="assets/img/delete.svg">
        </div>
      `;

    }
}

/**
 * This function gets the subtasks of the task from tasks array
 * 
 * @param {number} i This is the index of the task
 */
function setSubtasks(i) {
    let subtasksContainer = document.getElementById(`addTaskSubtaskPoint${n}`);
    subtasksContainer.innerHTML = '';
    subtasks = tasks[i].subtasks;
    for (let j = 0; j < subtasks.length; j++) {
        let subtask = subtasks[j]
        subtasksContainer.innerHTML += `
            <div id="checkboxContainer${n}${j}" class="subtaskContainer">
                         <div id="subtaskContainerValue${n}${j}">${subtask['subtaskTitle']}</div>
                         <div class="subtaskEdit"><img onclick = "openEditSubtask(${j})" class="taskEditSubtaskImg" src="assets/img/editTaskPenBlack.svg"><span style="color:#cecece">|</span><img onclick = "deleteSubtask(${j})" class="taskEditSubtaskImg" src="assets/img/delete.svg">
                         </div>
            </div>
          `;
    }
}

/**
 * This function opens an input to edit a subtask
 * 
 * @param {number} i This is the index of the subtask to be edited 
 */
function openEditSubtask(j) {
    let subtaskContainer = document.getElementById(`checkboxContainer${n}${j}`);
    let value = document.getElementById(`subtaskContainerValue${n}${j}`).textContent
    subtaskContainer.innerHTML = `<input id="subTaskEditContent${n}${j}" class="noOutline" type="text" maxlength="40" value="${value}" autocomplete="off">
          <div class="subtaskEdit subtaskEditOpen"><img onclick = "deleteSubtask(${j})" class="taskEditSubtaskImg" src="assets/img/delete.svg"><span style="color:#cecece">|</span><img onclick = "saveEditedSubtask(${j})" src="assets/img/blackCheck.svg">
        </div>`
}