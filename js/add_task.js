let title;
let description;
let choosenCategory
let selectedContacts = [];
let dueDate;
let prio;
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
    iconWhite: 'assets/img/prio-low-white-icon.svg',
    iconColor: 'assets/img/prio-low-icon.svg',
    ID: 'prio-green'
  },
  {
    name: 'medium',
    backgroundColor: '#ffa800',
    iconWhite: 'assets/img/prio-medium-white-icon.svg',
    iconColor: 'assets/img/prio-medium-icon.svg',
    ID: 'prio-yellow'

  },
  {
    name: 'urgent',
    backgroundColor: '#ff3c0',
    iconWhite: 'assets/img/prio-urgent-white-icon.svg',
    iconColor: 'assets/img/prio-urgent-icon.svg',
    ID: 'prio-red'
  }
]
let selectedColor;
let n = 0

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
    'taskTitle': document.getElementById(`task-title-input${n}`).value,
    'taskDescription': document.getElementById(`add-task-description${n}`).value,
    'taskCategory': choosenCategory,
    'assignedTo': selectedContacts,
    'dueDate': document.getElementById(`due-date${n}`).value,
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
  document.getElementById(`task-title-input${n}`).value = '';
  document.getElementById(`add-task-description${n}`).value = '';
  document.getElementById(`due-date${n}`).value = '';
  document.getElementById(`add-task-subtask-point${n}`).innerHTML = '';
  resetSubtasks()
  resetPrioButtons()
  renderAddTaskDropdowns()
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
  document.getElementById(`required-title${n}`).classList.remove('hidden');
  document.getElementById(`task-title-input${n}`).style.border = '2px solid red';
}

/**
 * This function clears the warning on title
 */
function clearTitleWarnings() {
  document.getElementById(`required-title${n}`).classList.add('hidden');
  document.getElementById(`task-title-input${n}`).style = '';
}

/**
 * This function adds warning on description
 */
function addDescriptionWarnings() {
  document.getElementById(`required-description${n}`).classList.remove('hidden');
  document.getElementById(`add-task-description${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on description
 */
function clearDescriptionWarnings() {
  document.getElementById(`required-description${n}`).classList.add('hidden');
  document.getElementById(`add-task-description${n}`).style = '';
}

/**
 * This function adds warning on new category
 */
function addNewCategoryWarning() {
  document.getElementById(`new-category-container${n}`).style.border = '2px solid red';
  document.getElementById(`required-category${n}`).classList.remove('hidden');
  document.getElementById(`required-category${n}`).innerHTML = 'Please enter name and color'
}

/**
 * This function adds warning on new priority
 */
function addPrioWarnings() {
  document.getElementById(`prio-red${n}`).style.border = '2px solid red';
  document.getElementById(`prio-yellow${n}`).style.border = '2px solid red';
  document.getElementById(`prio-green${n}`).style.border = '2px solid red';
  document.getElementById(`required-prio${n}`).classList.remove('hidden');
}

/**
 * This function clears warning on new priority
 */
function clearPrioWarnings() {
  document.getElementById(`prio-red${n}`).style = '';
  document.getElementById(`prio-yellow${n}`).style = '';
  document.getElementById(`prio-green${n}`).style = '';
  document.getElementById(`required-prio${n}`).classList.add('hidden');
}

/**
 * This function adds warning on category
 */
function addCategoryWarnings() {
  document.getElementById(`required-category${n}`).classList.remove('hidden');
  document.getElementById(`required-category${n}`).innerHTML = 'This field is required'
  document.getElementById(`select-container${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on category
 */
function clearCategoryWarnings() {
  document.getElementById(`required-category${n}`).classList.add('hidden');
  document.getElementById(`select-container${n}`).style = '';
  document.getElementById(`required-category${n}`).classList.add('hidden');
  document.getElementById(`new-category-container${n}`).style = '';
}

/**
 * This function adds warning on assigned to
 */
function addAssignedTowarnings() {
  document.getElementById(`required-assigned-to${n}`).classList.remove('hidden');
  document.getElementById(`assigned-to-container${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on assigned to
 */
function clearAssignedTowarnings() {
  document.getElementById(`required-assigned-to${n}`).classList.add('hidden');
  document.getElementById(`assigned-to-container${n}`).style = '';
}

/**
 * This function adds warning on due date
 */
function addDueDateWarnings() {
  document.getElementById(`required-due-date${n}`).classList.remove('hidden');
  document.getElementById(`due-date${n}`).style.border = '2px solid red';
}

/**
 * This function clears warning on due date
 */
function clearDueDateWarnings() {
  document.getElementById(`required-due-date${n}`).classList.add('hidden');
  document.getElementById(`due-date${n}`).style = '';
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
  if (element == `prio-red`) prio = prios[2]
  if (element == `prio-yellow`) prio = prios[1]
  if (element == `prio-green`) prio = prios[0]
}

/**
 * This function changes the source of the img an choosen buttons for design reasons
 * 
 * @param {string} element This is the choosen color
 */
function changePrioButtonIcon(element) {
  if (element == `prio-red`) document.getElementById(`prio-urgent-icon${n}`).src = 'assets/img/prio-urgent-white-icon.svg'
  if (element == `prio-yellow`) document.getElementById(`prio-medium-icon${n}`).src = 'assets/img/prio-medium-white-icon.svg'
  if (element == `prio-green`) document.getElementById(`prio-low-icon${n}`).src = 'assets/img/prio-low-white-icon.svg'
}

/**
 * This function resets the prio buttons
 */
function resetPrioButtons() {
  document.getElementById(`prio-red${n}`).classList.remove('prio-red')
  document.getElementById(`prio-yellow${n}`).classList.remove('prio-yellow')
  document.getElementById(`prio-green${n}`).classList.remove('prio-green')
  document.getElementById(`prio-urgent-icon${n}`).src = 'assets/img/prio-urgent-icon.svg'
  document.getElementById(`prio-medium-icon${n}`).src = 'assets/img/prio-medium-icon.svg'
  document.getElementById(`prio-low-icon${n}`).src = 'assets/img/prio-low-icon.svg'
}

/**
 * This function checks if the input title is empty and adds warning otherwise clears the warnings
 * 
 * @returns boolean
 */
function checkMandatoryFieldTitle() {
  let inputFeldTitle = document.getElementById(`task-title-input${n}`);
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
  let textareaFeldDescription = document.getElementById(`add-task-description${n}`);
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
  let inputFeldDueDate = document.getElementById(`due-date${n}`);
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
  let prioColorRed = document.getElementById(`prio-red${n}`);
  let prioColorYellow = document.getElementById(`prio-yellow${n}`);
  let prioColorGreen = document.getElementById(`prio-green${n}`);
  if (!prioColorRed.classList.contains('prio-red') && !prioColorYellow.classList.contains('prio-yellow') && !prioColorGreen.classList.contains('prio-green')) {
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
    <div class="selection-point-container" onclick="selectCategory(${i})">
      <div>${category['categorytext']}</div>
      <div class="color" style="background-color: ${category['categoryColor']}"></div>
    </div>
    <div class="color-and-delete-icon-container">
      <img onclick="deleteCategory(${i})" class="delete-icon" src = "./assets/img/delete.png" alt = "" >
    </div> 
  </div>`
}

/**
 * This function renders the category which is selected
 */
function renderAddTaskCategorySelect() {
  let content = document.getElementById(`select-container${n}`);
  content.innerHTML = `
  <div onclick="toggleAddTaskCategory()" class="categoryOption selectTask">
  <input readonly id="select-start-task-category${n}" class="input-outline"
  placeholder="Select task category"></input>
  <img class="arrow-icon" id="arrowIconCategory${n}" src="./assets/img/arrow_icon.svg" alt="" />
</div>
<div id="content-category-container${n}" class="d-none">
  <div onclick="openNewCategoryInput()" class="categoryOption">New Category</div>
  <div id="categorySelection${n}" class=""></div>
</div>`
}

/**
 * This function toogles the category container
 */
function toggleAddTaskCategory() {
  if (document.getElementById(`content-category-container${n}`).classList.contains('d-none'))
    openAddTaskCategory()
  else closeAddTaskCategory()
}

/**
 * This function opens the category container
 */
function openAddTaskCategory() {
  document.getElementById(`content-category-container${n}`).classList.remove('d-none')
  document.getElementById(`arrowIconCategory${n}`).classList.add('arrow-rotate')
}

/**
 * This function closes the category container
 */
function closeAddTaskCategory() {
  document.getElementById(`content-category-container${n}`).classList.add('d-none')
  document.getElementById(`arrowIconCategory${n}`).classList.remove('arrow-rotate')
  choosenCategory = undefined
  checkMandatoryFieldCategory()
}
/**
 * This function opens the new category input
 */
function openNewCategoryInput() {
  choosenCategory = undefined
  document.getElementById(`new-category-container${n}`).classList.remove('d-none');
  document.getElementById(`color-container${n}`).classList.remove('d-none');
  document.getElementById(`select-container${n}`).classList.add('d-none');
}
/**
 * This function closes the new category input
 */
function closeAddTaskNewCategory() {
  document.getElementById(`new-category-container${n}`).classList.add('d-none');
  document.getElementById(`color-container${n}`).classList.add('d-none');
  document.getElementById(`select-container${n}`).classList.remove('d-none');
}

/**
 * This function checks if the new category name is inserted and color choosen and shows warning
 */
function checkNewCategoryName() {
  let name = document.getElementById(`category${n}`);
  let color = document.getElementById(`color-button-container${n}`);
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
  document.getElementById(`color-button-container${n}`).innerHTML = '';
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
  document.getElementById(`color-button-container${n}`).innerHTML = `<div class="color-category-button" style="background-color :${selectedColor};"></div>`;
}

/**
 * This function renders the selected category to select container
 * 
 * @param {number} i index of category in categorys
 */
function selectCategory(i) {
  clearCategoryWarnings()
  choosenCategory = categorys[i];
  document.getElementById(`select-container${n}`).innerHTML = categoryTemplate(choosenCategory)
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
                  <div class="selection-point-container">
                    <div>${category['categorytext']}</div>
                    <div id="color-button-container${n}"><div class="color-category-button" style="background-color :${category['categoryColor']};">  
                    </div></div>
                  </div>
                  <img class="arrow-icon" id="arrowIconCategory${n}" src="./assets/img/arrow_icon.svg" alt="">
                </div>`
}
/**
 * This function generates the html for the selected contacts
 */
function renderAddTaskContactsSelect() {
  document.getElementById(`select-contacts-container${n}`).innerHTML = `
  <div onclick="toggleAddTaskContacts()" class="contactsOption">
              <div id="select-start-task-contact${n}">
                Select contacts to assign
              </div>
              <img id="arrow-rotate${n}" class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="" />
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
    <div id="invite-new-contact-container${n}" onclick="openInviteNewContact()" class="contactsOption">
      <div>Invite new contact</div>
      <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
    </div>`;

    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact['name'] !== 'Contact deleted') {
          content.innerHTML += /*html*/ `
              <div class="contactsOption">
                  <div class="selection-point-container">
                      <div>${contact['name']}</div>
                  </div>
                  <div>
                      <input id='${contact['name'] + n}' type="checkbox" name="option[]${n}" value="Option ${i}")"> 
                      <label for="${contact['name'] + n}"></label>
                  </div>    
              </div>`;
      }
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
  document.getElementById(`arrow-rotate${n}`).classList.add('arrow-rotate')
}

/**
 * This function closes the add task contacts dropdown
 */
function closeAddTaskContacts() {
  document.getElementById(`contacts${n}`).classList.add('d-none')
  document.getElementById(`arrow-rotate${n}`).classList.remove('arrow-rotate')
}
/**
 * This function opens the invite new contact container
 */
function openInviteNewContact() {
  document.getElementById(`select-contacts-container${n}`).classList.add('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.remove('d-none');
}

/**
 * This function clears and closes the invite new contact container
 */
function closeInviteNewContact() {
  clearInviteNewContactValue()
  document.getElementById(`select-contacts-container${n}`).classList.remove('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.add('d-none');
}
/**
 * This function checks if new contact field is empty and adds warning otherwise adds invited contact
 */
function checkNewContactField() {
  let newContactField = document.getElementById(`invite-new-contact${n}`);
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
  let email = document.getElementById(`invite-new-contact${n}`);
  let name = email.value.split('@')[0];
  let phone = ""
  let initials = document.getElementById(`invite-new-contact${n}`).value.charAt(0).toUpperCase();
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
  document.getElementById(`invite-new-contact${n}`).value = ''
}

/**
 * This funtion checks the checkboxes of contacts and adds them to selectedContacts
 */
function selectContactToAssign() {
  selectedContacts = []
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedContacts.push(i);
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
  document.getElementById(`due-date${n}`).setAttribute('min', getCurrentDate());
}

/**
 * This function opens the new subtask container
 */
function openSubtask() {
  document.getElementById(`add-new-subtask-container${n}`).classList.add('d-none');
  document.getElementById(`new-subtask-container${n}`).classList.remove('d-none');
}
/**
 * This function closes the new subtask container
 */
function closeSubtask() {
  document.getElementById(`add-new-subtask-container${n}`).classList.remove('d-none');
  document.getElementById(`new-subtask-container${n}`).classList.add('d-none');
}
/**
 * This function checks if new subtask input isn´t empty an adds new subtask to subtasks
 */
function addNewSubtask() {
  let newSubtaskInput = document.getElementById(`new-subtask-point${n}`);
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
 * This function renders html to subtask container
 */
function renderSubtasks() {
  let subtasksContainer = document.getElementById(`add-task-subtask-point${n}`);
  subtasksContainer.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = subtasks[i];
    let checkboxId = `subtask-checkbox-${n}-${i}`; // ID mit n-Wert und Index i
    subtasksContainer.innerHTML += `
      <div class="checkbox-container">
        <input id="${checkboxId}" class="checkbox" type="checkbox" ${subtask['subtaskDone'] ? 'checked' : ''}>
        <label for="${checkboxId}"></label>
        <div>${subtask['subtaskTitle']}</div>
      </div>
    `;

    let checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', function () {
      subtask['subtaskDone'] = this.checked;
    });
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
}

/**
 * This function deletes task from tasks array
 * 
 * @param {number} i This is the index of the task
 */
function deleteTask(i) {
  document.getElementById('activeTaskDelete').disabled = true;
  tasks.splice(i, 1)
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
  console.log(task)
  document.getElementById('task-title-input2').value = task.taskTitle
  document.getElementById('add-task-description2').value = task.taskDescription
  document.getElementById('due-date2').value = task.dueDate
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
    if (contactIDs.includes(k)) {
      checkboxes[k].checked = true
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

/**
 * This function gets the subtasks of the task from tasks array
 * 
 * @param {number} i This is the index of the task
 */
function setSubtasks(i) {
  let subtasksContainer = document.getElementById(`add-task-subtask-point${n}`);
  subtasksContainer.innerHTML = '';
  subtasks = tasks[i].subtasks;
  for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j]
    let checkboxId = `subtask-checkbox-${n}-${j}`; // ID mit n-Wert und Index i
    subtasksContainer.innerHTML += `
          <div class="checkbox-container">
            <input id="${checkboxId}" class="checkbox" type="checkbox" ${subtask['subtaskDone'] ? 'checked' : ''}>
            <label for="${checkboxId}"></label>
            <div>${subtask['subtaskTitle']}</div>
          </div>
        `;
    let checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', function () {
      subtask['subtaskDone'] = this.checked;
    });
  }
}
