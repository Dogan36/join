/**
 * This function renders the information of selected task into the edit task overlay
 * 
 * @param {number} i This is the index of the task to be shown on the edit task overlay
 */
function setEditTaskOverlay(i) {
    indexOfEditedTask = i
    let task = tasks[i]
    document.getElementById('taskTitleInput2').value = task.taskTitle
    document.getElementById('addTaskDescription2').value = task.taskDescription
    document.getElementById('dueDate2').value = task.dueDate
    setCategory(i)
    setContacts(i)
    setPrio(i)
    setSubtasks(i)
  }

 /**
 * This function opens the add task overlay
 * 
 * @param {string} progress Preset the progress of the task to create
 */
function openAddTaskOverlay(progress) {
  if (progress) taskProgress = progress
  else progress = 'toDo'
  clearTheInputFields()
  choosenCategory = undefined
  n = 1;
  renderAddTask()
  showDarkBackground()
  document.getElementById('addTaskOverlay').classList.add('overlayActive');
}

/**
 * This function opens the overlay with the active task
 * 
 * @param {number} i This is the position of the task in tasks array
 */
function openActiveTaskOverlay(i) {
  let activeTask = tasks[i];
  document.getElementById('activeTaskOverlay').innerHTML = addActiveTaskOverlayHTML(i)
  showDarkBackground()
  document.getElementById('activeTaskOverlay').classList.add('overlayActive')
}

/**
 * This function opens the edit task overlay with the active task 
 * 
 * @param {number} i This is the position of the task in tasks array
 */
function openEditTaskOverlay(i) {
  taskProgress = tasks[i].taskProgress
  closeOverlay()
  clearTheInputFields()
  n = 2;
  renderAddTask()
  setTimeout(showDarkBackground, 500)
  document.getElementById('editTaskOverlay').classList.add('overlayActive')
  setEditTaskOverlay(i)
}

/**
 * This function opens the new contact overlay
 */
function openNewContactOverlay() {
  showDarkBackground()
  document.getElementById('addContactOverlay').classList.add('overlayActive')
}

/**
 * This function closes the new contact overlay
 */
function closeNewContactOverlay() {
  document.getElementById('addContactOverlay').classList.add('d-none')
  document.getElementById('containerOpenedTask').classList.add('d-none')
}

/**
 * This function opens the edit contact overlay
 * 
 * @param {number} j This is the position of the contact in contacts array
 */
function openEditContactOverlay(j) {
  contactToEdit = j
  setEditContactOverlay(j)
  document.getElementById('editContactOverlay').classList.add('overlayActive')
  showDarkBackground()
}

/**
 * This function shows the dark background
 */
function showDarkBackground() {
  document.getElementById('darkBackgroundContainer').classList.remove('d-none');
}

/**
 * This function hides the dark background
 */
function closeDarkBackground() {
  document.getElementById('darkBackgroundContainer').classList.add('d-none');
}

/**
 * This function closes the active overlay
 */
function closeOverlay() {
  let overlay = document.querySelector('.overlayActive')
  if (overlay) overlay.classList.remove('overlayActive');
  clearTheInputFields()
  n = 0
  setTimeout(closeDarkBackground, 500)
}

/**
 * This function changes the inner html of the fly in button
 * 
 * @param {string} confirmation This is the change inside the fly in button
 */
function changeflyInButton(confirmation) {
  let flyInButton = document.getElementById(`flyInButton`);
  if (confirmation == 'taskAdded') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Task added to board</div>
  <img id="confirmationImg"src="./assets/img/boardIcon.svg" alt="">`}
  else if (confirmation == 'taskDeleted') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Task deleted</div>
  <img id="confirmationImg"src="./assets/img/deleteWhite.svg" alt="">`
  }
  else if (confirmation == 'taskMoved') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Task Moved</div>
  <img id="confirmationImg" src="./assets/img/moveWhite.svg" alt="">`
  }
  else if (confirmation == 'taskUpdated') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Task Updated</div>
  <img id="confirmationImg" src="./assets/img/update.svg" alt="">`
  }
  else if (confirmation == 'contactAdded') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Contact Added</div>
  <img id="confirmationImg" src="./assets/img/addContactIcon.svg" alt="">`
  }
  else if (confirmation == 'contactUpdated') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Contact Updated</div>
  <img id="confirmationImg" src="./assets/img/update.svg" alt="">`
  }
  else if (confirmation == 'newPassword') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">An e-mail has beend send</div>
  <img id="confirmationImg" src="./assets/img/SendCheck.svg" alt="">`
  }
  else if (confirmation == 'forgot') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Password has been changed</div>
   <img id="confirmationImg" src="./assets/img/update.svg" alt="">`
  }
  else if (confirmation == 'signedUp') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Signed up successfully</div>
  <img id="confirmationImg" src="./assets/img/userIcon.svg" alt="">`
  }
  else if (confirmation == 'contactDeleted') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="taskAddedToBoard">Contact deleted</div>
  <img id="confirmationImg" src="./assets/img/deleteWhite.svg" alt="">`
  }
}

/**
 * This function shows confirmation to the user
 * 
 * @param {string} confirmation This is the type of confirmation the user gets 
 */
function showConfirmation(confirmation) {
    showDarkBackground()
    let flyInButton = document.getElementById(`flyInButton`);
    changeflyInButton(confirmation)
    flyInButton.classList.remove('d-none');
  }

  /**
   * This function closes the confirmation
   */
  function closeConfirmation() {
    let flyInButton = document.getElementById(`flyInButton`);
    flyInButton.classList.add('d-none');
  }
  
/**
 * This function toogles the logout modal and closes it after timeout
 */
function toggleLogout() {
    let button = document.querySelector('.logOutModal')
    if (button.classList.contains('d-none')) button.classList.remove('d-none')
    else button.classList.add('d-none')
    setTimeout(closeLogout, 2000)
  }
  
  /**
   * This function closes the logout modal
   */
  function closeLogout() {
    let button = document.querySelector('.logOutModal')
    if (!button.classList.contains('d-none')) button.classList.add('d-none')
  }