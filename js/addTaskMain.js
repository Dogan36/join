let title;
let description;
let choosenCategory
let selectedContacts = [];
let dueDate;
let subtasks = []
let addTaskNewSubtasks = [];
let indexOfEditedTask
let taskProgress = 'toDo';
let prios = [
  {
    name: 'low',
    backgroundColor: '#ff3c00',
    iconWhite: 'assets/img/prioLowWhiteIcon.svg',
    iconColor: 'assets/img/prioLowIcon.svg',
    ID: 'prioGreen'
  },
  {
    name: 'medium',
    backgroundColor: '#ffa800',
    iconWhite: 'assets/img/prioMediumWhiteIcon.svg',
    iconColor: 'assets/img/prioMediumIcon.svg',
    ID: 'prioYellow'
  },
  {
    name: 'urgent',
    backgroundColor: '#ff3c0',
    iconWhite: 'assets/img/prioUrgentWhiteIcon.svg',
    iconColor: 'assets/img/prioUrgentIcon.svg',
    ID: 'prioRed'
  }
]
let selectedColor;
let n = 0
let prio = prios[1]

/**
 * This function checks the mandatory fields on add task an edit task
 * 
 * @param {number} indexOfEditedTask This is the index of the task to edit in tasks
 * @returns boolean
 */
function checkMandatoryFields(indexOfEditedTask) {
  let errorCount = 0;
  errorCount += checkMandatoryFieldTitle() ? 1 : 0;
  errorCount += checkMandatoryFieldDescription() ? 1 : 0;
  errorCount += checkMandatoryFieldCategory() ? 1 : 0;
  errorCount += checkMandatoryFieldDueDate() ? 1 : 0;
  errorCount += checkPrio() ? 1 : 0;
  if (errorCount > 0) return;
  addTask(indexOfEditedTask)
}

/**
 * This function adds the task and goes back to board page
 */
async function addTask() {
  selectContactToAssign()
  await addTaskJsonArray();
  goToBoardPage()
}

/**
 * This function adds the task to the json array
 */
async function addTaskJsonArray() {
  let taskJsonArray = getAddTaskJson()
  if (n != 2) {
    tasks.push(taskJsonArray);
    showConfirmation('taskAdded')
  }
  else if (n = 2) {
    tasks.splice(indexOfEditedTask, 1, taskJsonArray);
    showConfirmation('taskUpdated')
  }
  await setItem('tasks', tasks);
  renderBoard()
}

/**
 * This function gets the json of the task
 * 
 * @returns json
 */
function getAddTaskJson() {
  let taskJsonArray =
  {
    'taskTitle': document.getElementById(`taskTitleInput${n}`).value,
    'taskDescription': document.getElementById(`addTaskDescription${n}`).value,
    'taskCategory': choosenCategory,
    'assignedTo': selectedContacts,
    'dueDate': document.getElementById(`dueDate${n}`).value,
    'prio': prio,
    'subtasks': subtasks,
    'taskProgress': taskProgress,
  }
  return taskJsonArray
}

/**
 * This function clears the warnings
 */
function clearWarnings() {
  clearTitleWarnings()
  clearDescriptionWarnings()
  clearCategoryWarnings()
  clearAssignedTowarnings()
  clearDueDateWarnings()
  clearPrioWarnings()
}

/**
 * This function sets the prio depending on choosen color
 * 
 * @param {string} element his is the color of the choosen priority
 */
function setPrioColor(element) {
  if (element == `prioRed`) prio = prios[2]
  if (element == `prioYellow`) prio = prios[1]
  if (element == `prioGreen`) prio = prios[0]
}

/**
 * This function changes the source of the img an choosen buttons for design reasons
 * 
 * @param {string} element This is the choosen color
 */
function changePrioButtonIcon(element) {
  if (element == `prioRed`) document.getElementById(`prioUrgentIcon${n}`).src = 'assets/img/prioUrgentWhiteIcon.svg'
  if (element == `prioYellow`) document.getElementById(`prioMediumIcon${n}`).src = 'assets/img/prioMediumWhiteIcon.svg'
  if (element == `prioGreen`) document.getElementById(`prioLowIcon${n}`).src = 'assets/img/prioLowWhiteIcon.svg'
}

/**
 * This function adds new category to categorys
 */
async function addNewCategory() {
  let categorytext = document.getElementById(`category${n}`);
  let categoryID = categorys.length
  let newCategory = {
    'categoryId': categoryID,
    'categorytext': categorytext.value,
    'categoryColor': selectedColor
  }
  categorys.push(newCategory);
  await setItem('categorys', categorys);
}

/**
 * This function deletes category from categorys 
 * 
 * @param {number} i index of category in categorys
 */
async function deleteCategory(i) {
  categorys.splice(i, 1);
  await setItem('categorys', categorys);
  renderAddTaskCategorys()
  toggleAddTaskCategory()
}

/**
 * This function renders the selected colour to color button container
 * 
 * @param {number} i index of color in buttonBackgroundColor
 */
function colorButton(i) {
  selectedColor = '';
  selectedColor = buttonBackgroundColor[i];
  document.getElementById(`colorButtonContainer${n}`).innerHTML = `<div class="colorCategoryButton" style="background-color :${selectedColor};"></div>`;
}

/**
 * This function renders the selected category to select container
 * 
 * @param {number} i index of category in categorys
 */
function selectCategory(i) {
  clearCategoryWarnings()
  choosenCategory = categorys[i];
  document.getElementById(`selectContainer${n}`).innerHTML = categoryTemplate(choosenCategory)
}

/**
 * This function toogles the checkbox when clicked on parent div
 * 
 * @param {string} checkboxId This is the id of the checkbox to be toogled
 */
function toggleCheckbox(checkboxId) {
  let checkbox = document.getElementById(checkboxId);
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
  }
}

/**
 * This function toogles the add task contacts dropdown
 */
function toggleAddTaskContacts() {
  if (document.getElementById(`contacts${n}`).classList.contains('d-none'))
    openAddTaskContacts()
  else closeAddTaskContacts()
}

/**
 * This function opens the add task contacts dropdown
 */
function openAddTaskContacts() {
  document.getElementById(`contacts${n}`).classList.remove('d-none')
  document.getElementById(`arrowRotate${n}`).classList.add('arrowRotate')
}

/**
 * This function closes the add task contacts dropdown
 */
function closeAddTaskContacts() {
  document.getElementById(`contacts${n}`).classList.add('d-none')
  document.getElementById(`arrowRotate${n}`).classList.remove('arrowRotate')
}

/**
 * This function opens the invite new contact container
 */
function openInviteNewContact() {
  document.getElementById(`selectContactsContainer${n}`).classList.add('d-none');
  document.getElementById(`assignedToContainer${n}`).classList.remove('d-none');
}

/**
 * This function clears and closes the invite new contact container
 */
function closeInviteNewContact() {
  clearInviteNewContactValue()
  document.getElementById(`selectContactsContainer${n}`).classList.remove('d-none');
  document.getElementById(`assignedToContainer${n}`).classList.add('d-none');
}

/**
 * This function closes the dropdown menus at add task if the clicked event target is not one of the dropdowns
* 
* @param {event} event This is the event target which is clicked on
 */
function closeDropdownsAddTask(event) {
  let selectContainer = document.getElementById(`selectContainer${n}`);
  let selectContactsContainer = document.getElementById(`selectContactsContainer${n}`);
  if (!(selectContainer.contains(event.target))) closeAddTaskCategory();

  if (selectContactsContainer) {
    if (!(selectContactsContainer.contains(event.target))) {
      closeAddTaskContacts();
    }
  }
}

/**
 * This function checks if new contact field is empty and adds warning otherwise adds invited contact
 */
function checkNewContactField() {
  let newContactField = document.getElementById(`inviteNewContact${n}`);
  if (newContactField.value.indexOf('@') === -1) {
    addAssignedTowarnings()
  } else {
    clearAssignedTowarnings()
    addInviteContact()
  }
}

/**
 * This function adds invited contact to contacts
 */
async function addInviteContact() {
  let email = document.getElementById(`inviteNewContact${n}`);
  let name = email.value.split('@')[0];
  let phone = ""
  let initials = document.getElementById(`inviteNewContact${n}`).value.charAt(0).toUpperCase();
  contacts.unshift({ name: name, email: email.value, phone: phone, initials: initials });
  await setItem('contacts', contacts);
  renderContacts()
  closeInviteNewContact()
  renderAddTaskContacts()
  openAddTaskContacts()
}

/**
 * This funtion checks the checkboxes of contacts and adds them to selectedContacts
 */
function selectContactToAssign() {
  selectedContacts = [];
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      let contactIndex = parseInt(checkboxes[i].value.match(/\d+/)[0]);
      selectedContacts.push(contactIndex);
    }
  }
}

/**
 * This funtion uncheckes all checkboxes of contacts
 */
function uncheckSelectedContacts() {
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
}

/**
 * This function gets the current date
 * 
 * @returns string
 */
function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

/**
 * This function sets the minimum of due date to current date
 */
function setCurrentDate() {
  document.getElementById(`dueDate${n}`).setAttribute('min', getCurrentDate());
}

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
 * This function deletes task from tasks array
 * 
 * @param {number} i This is the index of the task
 */
async function deleteTask(i) {
  document.getElementById('activeTaskDelete').disabled = true;
  tasks.splice(i, 1);
  await setItem('tasks', tasks);
  showConfirmation('taskDeleted')
  goToBoardPage()
  document.getElementById('activeTaskDelete').disabled = false;
}

/**
 * This function gets the category of the task from tasks array
 * 
 * @param {number} i This is the index of the task
 */
function setCategory(i) {
  let categoryID = tasks[i].taskCategory.categoryId
  selectCategory(`${categoryID}`)
}

/**
 * This function gets the contacts of the task from tasks array and checks the checkboxes of the selected contacts
 * 
 * @param {number} i This is the index of the task
 */
function setContacts(i) {
  let contactamount = tasks[i].assignedTo.length
  let contactIDs = []
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (var j = 0; j < contactamount; j++) {
    var contId = tasks[i].assignedTo[j];
    contactIDs.push(contId)
  }
  for (let k = 0; k < checkboxes.length; k++) {
    let checkboxValue = checkboxes[k].value;
    checkboxValue = checkboxValue.slice(7);
    let checkboxNumber = parseInt(checkboxValue, 10);
    if (contactIDs.includes(checkboxNumber)) {
      checkboxes[k].checked = true;
    }
  }
}

/**
 * This function gets the prio of the task from tasks array
 * 
 * @param {number} i This is the index of the task
 */

function setPrio(i) {
  resetPrioButtons()
  let prioEdit = tasks[i].prio.ID
  let divClicked = document.getElementById(`${prioEdit}2`)
  divClicked.classList.add(`${prioEdit}`)
  changePrioButtonIcon(prioEdit)
  prio = tasks[i].prio
}