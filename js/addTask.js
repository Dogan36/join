let title;
let description;
let choosenCategory
let selectedContacts = [];
let dueDate;
let subtasks = []
let addTaskNewSubtasks = [];
let indexOfEditedTask
let taskProgress = 'toDo';
let buttonBackgroundColor = [
  '#800080',   // Purple
  '#ff0000',   // Red
  '#008000',   // Green
  '#ffba00',   // Orange
  '#ffc0cb',   // Pink
  '#0000ff',   // Blue
  '#ffff00',   // Yellow
  '#00ffff',   // Cyan
  '#800000',   // Maroon
  '#808080'    // Gray
];
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
 * This function clears the input fields off add task and clears the warnings
 */
function clearTheInputFields() {
  deleteAddTaskFields()
  clearWarnings()
 
}
/**
 * This function deletes the values of the input fields and resets the buttons and dropdowns
 */
function deleteAddTaskFields() {
  document.getElementById(`taskTitleInput${n}`).value = '';
  document.getElementById(`addTaskDescription${n}`).value = '';
  document.getElementById(`dueDate${n}`).value = '';
  document.getElementById(`addTaskSubtaskPoint${n}`).innerHTML = '';
  resetSubtasks()
  //resetPrioButtons()
  renderAddTask()
}

/**
 * This function resets the subtasks
 */
function resetSubtasks() {
  subtasks = []
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
 * This function adds a warning on title
 */

function addTitleWarnings() {
  document.getElementById(`requiredTitle${n}`).classList.remove('hidden');
  document.getElementById(`taskTitleInput${n}`).style.border = '2px solid red';
}

/**
 * This function clears the warning on title
 */
function clearTitleWarnings() {
  document.getElementById(`requiredTitle${n}`).classList.add('hidden');
  document.getElementById(`taskTitleInput${n}`).style = '';
}

/**
 * This function adds warning on description
 */
function addDescriptionWarnings() {
  document.getElementById(`requiredDescription${n}`).classList.remove('hidden');
  document.getElementById(`addTaskDescription${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on description
 */
function clearDescriptionWarnings() {
  document.getElementById(`requiredDescription${n}`).classList.add('hidden');
  document.getElementById(`addTaskDescription${n}`).style = '';
}

/**
 * This function adds warning on new category
 */
function addNewCategoryWarning() {
  document.getElementById(`newCategoryContainer${n}`).style.border = '2px solid red';
  document.getElementById(`requiredCategory${n}`).classList.remove('hidden');
  document.getElementById(`requiredCategory${n}`).innerHTML = 'Please enter name and color'
}

/**
 * This function adds warning on new priority
 */
function addPrioWarnings() {
  document.getElementById(`prioRed${n}`).style.border = '2px solid red';
  document.getElementById(`prioYellow${n}`).style.border = '2px solid red';
  document.getElementById(`prioGreen${n}`).style.border = '2px solid red';
  document.getElementById(`requiredPrio${n}`).classList.remove('hidden');
}

/**
 * This function clears warning on new priority
 */
function clearPrioWarnings() {
  document.getElementById(`prioRed${n}`).style = '';
  document.getElementById(`prioYellow${n}`).style = '';
  document.getElementById(`prioGreen${n}`).style = '';
  document.getElementById(`requiredPrio${n}`).classList.add('hidden');
}

/**
 * This function adds warning on category
 */
function addCategoryWarnings() {
  document.getElementById(`requiredCategory${n}`).classList.remove('hidden');
  document.getElementById(`requiredCategory${n}`).innerHTML = 'This field is required'
  document.getElementById(`selectContainer${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on category
 */
function clearCategoryWarnings() {
  document.getElementById(`requiredCategory${n}`).classList.add('hidden');
  document.getElementById(`selectContainer${n}`).style = '';
  document.getElementById(`requiredCategory${n}`).classList.add('hidden');
  document.getElementById(`newCategoryContainer${n}`).style = '';
}

/**
 * This function adds warning on assigned to
 */
function addAssignedTowarnings() {
  document.getElementById(`requiredAssignedTo${n}`).classList.remove('hidden');
  document.getElementById(`assignedToContainer${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on assigned to
 */
function clearAssignedTowarnings() {
  document.getElementById(`requiredAssignedTo${n}`).classList.add('hidden');
  document.getElementById(`assignedToContainer${n}`).style = '';
}

/**
 * This function adds warning on due date
 */
function addDueDateWarnings() {
  document.getElementById(`requiredDueDate${n}`).classList.remove('hidden');
  document.getElementById(`dueDate${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on due date
 */
function clearDueDateWarnings() {
  document.getElementById(`requiredDueDate${n}`).classList.add('hidden');
  document.getElementById(`dueDate${n}`).style = '';
}

/**
 * This function chooses priority
 * 
 * @param {string} color This is the color of the choosen priority
 */
function choosePrio(color) {
  clearPrioWarnings()
  let divClicked = document.getElementById(`${color}${n}`)
  setPrioColor(color)
  resetPrioButtons()
  divClicked.classList.add(`${color}`)
  changePrioButtonIcon(color)
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
 * This function resets the prio buttons
 */
function resetPrioButtons() {
  document.getElementById(`prioRed${n}`).classList.remove('prioRed')
  document.getElementById(`prioYellow${n}`).classList.remove('prioYellow')
  document.getElementById(`prioGreen${n}`).classList.remove('prioGreen')
  document.getElementById(`prioUrgentIcon${n}`).src = 'assets/img/prioUrgentIcon.svg'
  document.getElementById(`prioMediumIcon${n}`).src = 'assets/img/prioMediumIcon.svg'
  document.getElementById(`prioLowIcon${n}`).src = 'assets/img/prioLowIcon.svg'
}

/**
 * This function checks if the input title is empty and adds warning otherwise clears the warnings
 * 
 * @returns boolean
 */
function checkMandatoryFieldTitle() {
  let inputFeldTitle = document.getElementById(`taskTitleInput${n}`);
  if (inputFeldTitle.value === '') {
    addTitleWarnings()
    return true
  }
  else clearTitleWarnings()
}

/**
 * This function checks if the input description is empty and adds warning otherwise clears the warnings
 * 
 * @returns boolean
 */
function checkMandatoryFieldDescription() {
  let textareaFeldDescription = document.getElementById(`addTaskDescription${n}`);
  if (textareaFeldDescription.value === '') {
    addDescriptionWarnings()
    return true
  }
  else clearDescriptionWarnings()
}

/**
 * This function checks if the input due date is empty and adds warning otherwise clears the warnings
 * 
 * @returns boolean
 */
function checkMandatoryFieldDueDate() {
  let inputFeldDueDate = document.getElementById(`dueDate${n}`);
  if (inputFeldDueDate.value === '') {
    addDueDateWarnings()
    return true
  }
  else clearDueDateWarnings()
}

/**
 * This function checks if the input category is empty and adds warning otherwise clears the warnings
 * 
 * @returns boolean
 */
function checkMandatoryFieldCategory() {
  if (choosenCategory == undefined) {
    addCategoryWarnings();
    return true
  }
  else clearCategoryWarnings()
}

/**
 * This function checks if the input prio is empty and adds warning otherwise clears the warnings
 * 
 * @returns boolean
 */
function checkPrio() {
  let prioColorRed = document.getElementById(`prioRed${n}`);
  let prioColorYellow = document.getElementById(`prioYellow${n}`);
  let prioColorGreen = document.getElementById(`prioGreen${n}`);
  if (!prioColorRed.classList.contains('prioRed') && !prioColorYellow.classList.contains('prioYellow') && !prioColorGreen.classList.contains('prioGreen')) {
    addPrioWarnings()
    return true
  } else {
    clearPrioWarnings()
    return false
  }
}

/**
 * This function renders the categories into the drop down
 */
function renderAddTaskCategorys() {
  let content = document.getElementById(`categorySelection${n}`);
  content.innerHTML = ''
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i];
    content.innerHTML += renderAddTaskCategoriesHTML(i, category);
  }
}

/**
 * This function generates the html of the categories
 * 
 * @param {number} i index of the category in categorys
 * @param {string} category name of the category
 * @returns string
 */
function renderAddTaskCategoriesHTML(i, category) {
  return `
  <div class="categoryOption" >
    <div class="selectionPointContainer" onclick="selectCategory(${i})">
      <div>${category['categorytext']}</div>
      <div class="color" style="background-color: ${category['categoryColor']}"></div>
    </div>
    <div class="colorAndDeleteIconContainer">
      <img onclick="deleteCategory(${i})" class="deleteIcon" src = "./assets/img/delete.png" alt = "" >
    </div> 
  </div>`
}

/**
 * This function renders the category which is selected
 */
function renderAddTaskCategorySelect() {
  let content = document.getElementById(`selectContainer${n}`);
  content.innerHTML = `
  <div onclick="toggleAddTaskCategory()" class="categoryOption selectTask">
  <input readonly id="selectStartTaskCategory${n}" class="inputOutline"
  placeholder="Select task category"></input>
  <img class="arrowIcon" id="arrowIconCategory${n}" src="./assets/img/arrowIcon.svg" alt="" />
</div>
<div id="contentCategoryContainer${n}" class="d-none">
  <div onclick="openNewCategoryInput()" class="categoryOption">New Category</div>
  <div id="categorySelection${n}" class=""></div>
</div>`
}

/**
 * This function toogles the category container
 */
function toggleAddTaskCategory() {
  if (document.getElementById(`contentCategoryContainer${n}`).classList.contains('d-none'))
    openAddTaskCategory()
  else {
    closeAddTaskCategory();
    checkMandatoryFieldCategory()
  }
}

/**
 * This function opens the category container
 */
function openAddTaskCategory() {
  document.getElementById(`contentCategoryContainer${n}`).classList.remove('d-none')
  document.getElementById(`arrowIconCategory${n}`).classList.add('arrowRotate')
}

/**
 * This function closes the category container
 */
function closeAddTaskCategory() {
  let contentCategoryContainer = document.getElementById(`contentCategoryContainer${n}`)
  let arrowIconCategory = document.getElementById(`arrowIconCategory${n}`)
  if (contentCategoryContainer) {
    contentCategoryContainer.classList.add('d-none')
    arrowIconCategory.classList.remove('arrowRotate')
    choosenCategory = undefined
  }
}
/**
 * This function opens the new category input
 */
function openNewCategoryInput() {
  choosenCategory = undefined
  document.getElementById(`newCategoryContainer${n}`).classList.remove('d-none');
  document.getElementById(`colorContainer${n}`).classList.remove('d-none');
  document.getElementById(`selectContainer${n}`).classList.add('d-none');
}
/**
 * This function closes the new category input
 */
function closeAddTaskNewCategory() {
  document.getElementById(`newCategoryContainer${n}`).classList.add('d-none');
  document.getElementById(`colorContainer${n}`).classList.add('d-none');
  document.getElementById(`selectContainer${n}`).classList.remove('d-none');
}

/**
 * This function checks if the new category name is inserted and color choosen and shows warning
 */
function checkNewCategoryName() {
  let name = document.getElementById(`category${n}`);
  let color = document.getElementById(`colorButtonContainer${n}`);
  if (name.value === '' || color.innerHTML === '') addNewCategoryWarning()
  else {
    clearCategoryWarnings()
    addNewCategory();
    resetNewCategoryInput()
    closeAddTaskNewCategory()
    selectCategory(categorys.length - 1)
  }
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
 * This function resets inputs on new category
 */
function resetNewCategoryInput() {
  document.getElementById(`category${n}`).value = "";
  document.getElementById(`colorButtonContainer${n}`).innerHTML = '';
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
 * This function generates the html for the select container
 * 
 * @param {JSON} category This is the json of the selected category
 * @returns string
 */
function categoryTemplate(category) {
  return `
    <div onclick="renderAddTaskCategorySelect(); renderAddTaskCategorys(), toggleAddTaskCategory()" class="categoryOption">
                  <div class="selectionPointContainer">
                    <div>${category['categorytext']}</div>
                    <div id="colorButtonContainer${n}"><div class="colorCategoryButton" style="background-color :${category['categoryColor']};">  
                    </div></div>
                  </div>
                  <img class="arrowIcon" id="arrowIconCategory${n}" src="./assets/img/arrowIcon.svg" alt="">
                </div>`
}
/**
 * This function generates the html for the selected contacts
 */
function renderAddTaskContactsSelect() {
  document.getElementById(`selectContactsContainer${n}`).innerHTML = `
  <div onclick="toggleAddTaskContacts()" class="contactsOption">
              <div class="addTaskDropdownHeader" id="selectStartTaskContact${n}">
                Select contacts to assign
              </div>
              <img id="arrowRotate${n}" class="arrowIcon" src="./assets/img/arrowIcon.svg" alt="" />
            </div>
            <div id="contacts${n}" class="d-none">
              </div>
          `
}

/**
 * This function generates the html for the contacts
 */
function renderAddTaskContacts() {
  let content = document.getElementById(`contacts${n}`);
  content.innerHTML = '';
  content.innerHTML = `
    <div id="inviteNewContactContainer${n}" onclick="openInviteNewContact()" class="contactsOption">
      <div>Invite new contact</div>
      <img class="contactIcon" src="assets/img/contactIcon.svg" alt="">
    </div>`;

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    if (contact['name'] !== 'Contact deleted') {
      content.innerHTML += /*html*/ `
      <div class="contactsOption" onclick="toggleCheckbox('${contact['name'] + n}')">
      <div class="selectionPointContainer">
        <div>${contact['name']}</div>
      </div>
      <div>
        <input id='${contact['name'] + n}' type="checkbox" name="option[]${n}" value="Option ${i}">
        <label for="${contact['name'] + n}"></label>
      </div>
    </div>`;
    }
  }
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
function closeDropdownsAddTask(event) {
  const selectContainer = document.getElementById(`selectContainer${n}`);
  const selectContactsContainer = document.getElementById(`selectContactsContainer${n}`);
  // Überprüfe, ob das geklickte Element oder eines seiner Elternelemente selectContainer ist

  if (!(selectContainer.contains(event.target))) {
    closeAddTaskCategory();
  }

  // Überprüfe, ob das geklickte Element oder eines seiner Elternelemente selectContactsContainer ist
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
 * This function clears invite new contact input
 */
function clearInviteNewContactValue() {
  document.getElementById(`inviteNewContact${n}`).value = ''
}

/**
 * This funtion checks the checkboxes of contacts and adds them to selectedContacts
 */
function selectContactToAssign() {
  selectedContacts = [];
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      // Extrahiere den Index aus dem value-Attribut der Checkbox
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

function saveEditedSubtask(i) {
  let newSubtaskInput = document.getElementById(`subTaskEditContent${n}${i}`);
  if (newSubtaskInput.value !== '') {
    let newSubtask = {
      'subtaskTitle': newSubtaskInput.value,
      'subtaskDone': false
    }
    subtasks.splice(i, 1, newSubtask)
    newSubtaskInput.value = '';
    renderSubtasks()
  }
}

function deleteSubtask(i) {
  subtasks.splice(i, 1)
  renderSubtasks()
}

function openEditSubtask(i) {
  let subtaskContainer = document.getElementById(`checkboxContainer${n}${i}`);
  let value = document.getElementById(`subtaskContainerValue${n}${i}`).textContent
  subtaskContainer.innerHTML = `<input id="subTaskEditContent${n}${i}" class="noOutline" type="text" maxlength="40" value="${value}" autocomplete="off">
        <div class="subtaskEdit subtaskEditOpen"><img onclick = "deleteSubtask(${i})" class="taskEditSubtaskImg" src="assets/img/delete.svg"><span style="color:#cecece">|</span><img onclick = "saveEditedSubtask(${i})" src="assets/img/blackCheck.svg">
      </div>`
}

/**
 * This function renders html to subtask container
 */
function renderSubtasks() {
  let subtasksContainer = document.getElementById(`addTaskSubtaskPoint${n}`);
  subtasksContainer.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = subtasks[i];

    subtasksContainer.innerHTML += `
      <div id="checkboxContainer${n}${i}" class="subtaskContainer">
        <div id="subtaskContainerValue${n}${i}">${subtask['subtaskTitle']}</div>
        <div class="subtaskEdit"><img onclick = "openEditSubtask(${i})" class="taskEditSubtaskImg" src="assets/img/editTaskPenBlack.svg"><span style="color:#cecece">|</span><img onclick = "deleteSubtask(${i})" class="taskEditSubtaskImg" src="assets/img/delete.svg">
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
          <div id="checkboxContainer${n}${i}" class="subtaskContainer">
                       <div id="subtaskContainerValue${n}${i}">${subtask['subtaskTitle']}</div>
                       <div class="subtaskEdit"><img onclick = "openEditSubtask(${i})" class="taskEditSubtaskImg" src="assets/img/editTaskPenBlack.svg"><span style="color:#cecece">|</span><img onclick = "deleteSubtask(${i})" class="taskEditSubtaskImg" src="assets/img/delete.svg">
                       </div>
          </div>
        `;

  }
}
/**
 * This function directs user to board page
 */
function goToBoardPage() {
  let boardButton = document.getElementById('board');
  renderBoard()
  setTimeout(function () {
    boardButton.click();
    document.getElementById(`addTaskForm${n}`).reset()
    deleteAddTaskFields();
    uncheckSelectedContacts();
    closeOverlay()
    closeConfirmation()
  }, 1000);
}
/**
 * This function checkes if new added subtask is already done and add that info to subtask
 * 
 * @param {Boolean} checked This is the info if subtask checkbox is checked or not
 * @param {number} i This is the index of the task
 * @param {number} index This is the index of the subtask
 */
function updateSubtaskDone(checked, i, index) {
  tasks[i].subtasks[index]['subtaskDone'] = checked;
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
  let newOnClickFunction = "setEditTaskOverlay(" + i + ")";
  document.querySelector('.overlayCancelButton').setAttribute('onclick', newOnClickFunction);
  setCategory(i)
  setContacts(i)
  setPrio(i)
  setSubtasks(i)
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
  let prioEdit = tasks[i].prio.ID
  let divClicked = document.getElementById(`${prioEdit}2`)
  divClicked.classList.add(`${prioEdit}`)
  changePrioButtonIcon(prioEdit)
  prio = tasks[i].prio
}


