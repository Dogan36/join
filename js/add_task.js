let title;
let description;
let category
let selectedContacts = [];
let dueDate;
let prio;
let subtasks = []
let addTaskNewSubtasks = [];
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
    iconColor: 'assets/img/prio-low-icon.svg'
  },
  {
    name: 'medium',
    backgroundColor: '#ffa800',
    iconWhite: 'assets/img/prio-medium-white-icon.svg',
    iconColor: 'assets/img/prio-medium-icon.svg'
   
  },
  {
    name: 'urgent',
    backgroundColor: '#ff3c0',
    iconWhite: 'assets/img/prio-urgent-white-icon.svg',
    iconColor: 'assets/img/prio-urgent-icon.svg'
  }
]
let selectedColor;
let n = 0


function checkMandatoryFields(n) {
  let errorCount = 0;
  errorCount += checkMandatoryFieldTitle(n) ? 1 : 0;
  errorCount += checkMandatoryFieldDescription(n) ? 1 : 0;
  errorCount += checkMandatoryFieldCategory(n) ? 1 : 0;
  errorCount += checkMandatoryFieldDueDate(n) ? 1 : 0;
  errorCount += checkPrio(n) ? 1 : 0;
  if (errorCount > 0) return;
  addTask(n)

}

async function addTask() {
  selectContactToAssign()
  await addTaskJsonArray(); /* Das addTaskJasonArray() hollt sich die restlichen Punkte aus den globalen Variablen   */
  flyInButton()
  goToBoardPage()
  
}

async function addTaskJsonArray() {
  let taskJsonArray = {
    'taskTitle': document.getElementById(`task-title-input${n}`).value,
    'taskDescription': document.getElementById(`add-task-description${n}`).value,
    'taskCategory': category,
    'assignedTo': selectedContacts,
    'dueDate': document.getElementById(`due-date${n}`).value,
    'prio': prio,
    'subtasks': subtasks,
    'taskProgress': 'toDo',
  }
  tasks.push(taskJsonArray);
  await setServer();
}






function clearTheInputFields() {
  deleteAddTaskFields()
  clearWarnings()
}



function deleteAddTaskFields() {
  document.getElementById(`task-title-input${n}`).value = '';
  document.getElementById(`add-task-description${n}`).value = '';
  document.getElementById(`due-date${n}`).value = '';
  document.getElementById(`add-task-subtask-point${n}`).innerHTML = '';

  resetPrioButtons()
  resetSelectedContacts()
  resetSubtasks()
 
}

function resetSelectedContacts(){
selectedContacts=[]
}

function resetSubtasks(){
subtasks=[]
}


function clearWarnings() {
  clearTitleWarnings()
  clearDescriptionWarnings()
  clearCategoryWarnings()
  clearAssignedTowarnings()
  clearDueDateWarnings()
  clearPrioWarnings()
}


function addTitleWarnings() {
  document.getElementById(`required-title${n}`).classList.remove('hidden');
  document.getElementById(`task-title-input${n}`).style.border = '2px solid red';
}


function clearTitleWarnings() {
  document.getElementById(`required-title${n}`).classList.add('hidden');
  document.getElementById(`task-title-input${n}`).style = '';
}


function addDescriptionWarnings() {
  document.getElementById(`required-description${n}`).classList.remove('hidden');
  document.getElementById(`add-task-description${n}`).style.border = '2px solid red';
}


function clearDescriptionWarnings() {
  document.getElementById(`required-description${n}`).classList.add('hidden');
  document.getElementById(`add-task-description${n}`).style = '';
}


function addNewCategoryWarning() {
  document.getElementById(`new-category-container${n}`).style.border = '2px solid red';
  document.getElementById(`required-category${n}`).classList.remove('hidden');
  document.getElementById(`required-category${n}`).innerHTML = 'Please enter name and color'

}


function addPrioWarnings() {
  document.getElementById(`prio-red${n}`).style.border = '2px solid red';
  document.getElementById(`prio-yellow${n}`).style.border = '2px solid red';
  document.getElementById(`prio-green${n}`).style.border = '2px solid red';
  document.getElementById(`required-prio${n}`).classList.remove('hidden');
}


function clearPrioWarnings() {
  document.getElementById(`prio-red${n}`).style = '';
  document.getElementById(`prio-yellow${n}`).style = '';
  document.getElementById(`prio-green${n}`).style = '';
  document.getElementById(`required-prio${n}`).classList.add('hidden');
}


function addCategoryWarnings() {
  document.getElementById(`required-category${n}`).classList.remove('hidden');
  document.getElementById(`required-category${n}`).innerHTML = 'This field is required'
  document.getElementById(`select-container${n}`).style.border = '2px solid red';

}


function clearCategoryWarnings() {
  document.getElementById(`required-category${n}`).classList.add('hidden');
  document.getElementById(`select-container${n}`).style = '';
  document.getElementById(`required-category${n}`).classList.add('hidden');
  document.getElementById(`new-category-container${n}`).style = '';

}


function addAssignedTowarnings() {
  document.getElementById(`required-assigned-to${n}`).classList.remove('hidden');
  document.getElementById(`assigned-to-container${n}`).style.border = '2px solid red';
}


function clearAssignedTowarnings() {
  document.getElementById(`required-assigned-to${n}`).classList.add('hidden');
  document.getElementById(`assigned-to-container${n}`).style = '';
}


function addDueDateWarnings() {
  document.getElementById(`required-due-date${n}`).classList.remove('hidden');
  document.getElementById(`due-date${n}`).style.border = '2px solid red';
}


function clearDueDateWarnings() {
  document.getElementById(`required-due-date${n}`).classList.add('hidden');
  document.getElementById(`due-date${n}`).style = '';
}


function choosePrio(element, color) {
  clearPrioWarnings()
  let divClicked = document.getElementById(`${element}`)
  setPrio(element)
  resetPrioButtons()
  divClicked.classList.add(`${color}`)
  changePrioButtonIcon(element)
}


function setPrio(element) {
  if (element == `prio-red${n}`) prio = prios[2]
  if (element == `prio-yellow${n}`) prio = prios[1]
  if (element == `prio-green${n}`) prio = prios[0]
}


function changePrioButtonIcon(element) {
  if (element == `prio-red${n}`) document.getElementById(`prio-urgent-icon${n}`).src = 'assets/img/prio-urgent-white-icon.svg'
  if (element == `prio-yellow${n}`) document.getElementById(`prio-medium-icon${n}`).src = 'assets/img/prio-medium-white-icon.svg'
  if (element == `prio-green${n}`) document.getElementById(`prio-low-icon${n}`).src = 'assets/img/prio-low-white-icon.svg'
}


function resetPrioButtons() {
  document.getElementById(`prio-red${n}`).classList.remove('prio-red')
  document.getElementById(`prio-yellow${n}`).classList.remove('prio-yellow')
  document.getElementById(`prio-green${n}`).classList.remove('prio-green')
  document.getElementById(`prio-urgent-icon${n}`).src = 'assets/img/prio-urgent-icon.svg'
  document.getElementById(`prio-medium-icon${n}`).src = 'assets/img/prio-medium-icon.svg'
  document.getElementById(`prio-low-icon${n}`).src = 'assets/img/prio-low-icon.svg'
}


function checkMandatoryFieldTitle() {
  let inputFeldTitle = document.getElementById(`task-title-input${n}`);
  if (inputFeldTitle.value === '') {
    addTitleWarnings()
    return true
  }
  else clearTitleWarnings()
}


function checkMandatoryFieldDescription() {
  let textareaFeldDescription = document.getElementById(`add-task-description${n}`);
  if (textareaFeldDescription.value === '') {
    addDescriptionWarnings()
    return true}
  else clearDescriptionWarnings()
}




function checkMandatoryFieldDueDate() {
  let inputFeldDueDate = document.getElementById(`due-date${n}`);
  if (inputFeldDueDate.value === '') {
    addDueDateWarnings()
    return true}
  else clearDueDateWarnings()
}


function checkMandatoryFieldCategory() {
 
  if (category == undefined) {
    addCategoryWarnings();
    return true}
  else clearCategoryWarnings()
}


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


function renderAddTaskCategorys() {
  let content = document.getElementById(`categorySelection`);
  content.innerHTML = ''
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i];
    content.innerHTML += renderAddTaskCategoriesHTML(i, category);
  }
}


function renderAddTaskCategoriesHTML(i, category) {
  return `
  <div class="categoryOption" >
    <div class="selection-point-container" onclick="selectCategory(${i}, ${n})">
      <div>${category['categorytext']}</div>
      <div class="color" style="background-color: ${category['categoryColor']}"></div>
    </div>
    <div class="color-and-delete-icon-container">
      <img onclick="deleteCategory(${i})" class="delete-icon" src = "./assets/img/delete.png" alt = "" >
    </div> 
  </div>`
}

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
  <div id="categorySelection" class=""></div>
</div>`
}


function toggleAddTaskCategory() {
  if (document.getElementById(`content-category-container${n}`).classList.contains('d-none'))
    openAddTaskCategory()
  else closeAddTaskCategory()
}

function openAddTaskCategory() {
  document.getElementById(`content-category-container${n}`).classList.remove('d-none')
  document.getElementById(`arrowIconCategory${n}`).classList.add('arrow-rotate')
}

function closeAddTaskCategory() {
  document.getElementById(`content-category-container${n}`).classList.add('d-none')
  document.getElementById(`arrowIconCategory${n}`).classList.remove('arrow-rotate')
  category = ''
  checkMandatoryFieldCategory()
}


function openNewCategoryInput() {
  // clearCategoryWarnings()
  category == ''
  document.getElementById(`new-category-container${n}`).classList.remove('d-none');
  document.getElementById(`color-container${n}`).classList.remove('d-none');
  document.getElementById(`select-container${n}`).classList.add('d-none');
}

function closeAddTaskNewCategory() {
  document.getElementById(`new-category-container${n}`).classList.add('d-none');
  document.getElementById(`color-container${n}`).classList.add('d-none');
  document.getElementById(`select-container${n}`).classList.remove('d-none');
}

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

async function addNewCategory() {
  let categorytext = document.getElementById(`category${n}`);
  let newCategory = {
    'categorytext': categorytext.value,
    'categoryColor': selectedColor
  }
  categorys.push(newCategory);
  await setServer();
}

function resetNewCategoryInput() {
  document.getElementById(`category${n}`).value = "";
  document.getElementById(`color-button-container${n}`).innerHTML = '';
}

async function deleteCategory(i) {
  categorys.splice(i, 1);
  await setServer();
  renderAddTaskCategorys()
}

function colorButton(i) {
  selectedColor = '';
  selectedColor = buttonBackgroundColor[i];
  document.getElementById(`color-button-container${n}`).innerHTML = `<div class="color-category-button" style="background-color :${selectedColor};"></div>`;
}

function selectCategory(i) {
  clearCategoryWarnings()
  category = categorys[i];
  document.getElementById(`select-container${n}`).innerHTML = categoryTemplate(category)
}

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

function renderAddTaskContacts() {
  let content = document.getElementById(`contacts${n}`);
  content.innerHTML = '';
  // renderCloseTaskCategory(n, content)
  content.innerHTML = `
    <div id="invite-new-contact-container${n}" onclick="openInviteNewContact()" class="contactsOption">
      <div>Invite new contact</div>
      <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
    </div>`;

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    content.innerHTML +=/*html*/`
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







function toggleAddTaskContacts() {
  if (document.getElementById(`contacts${n}`).classList.contains('d-none'))
    openAddTaskContacts()
  else closeAddTaskContacts()
}

function openAddTaskContacts() {
  document.getElementById(`contacts${n}`).classList.remove('d-none')
  document.getElementById(`arrow-rotate${n}`).classList.add('arrow-rotate')
}

function closeAddTaskContacts() {
  document.getElementById(`contacts${n}`).classList.add('d-none')
  document.getElementById(`arrow-rotate${n}`).classList.remove('arrow-rotate')

}

function openInviteNewContact() {
  document.getElementById(`select-contacts-container${n}`).classList.add('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.remove('d-none');
}

function closeInviteNewContact() {
  clearInviteNewContactValue()
  document.getElementById(`invite-new-contact${n}`).value = ''
  document.getElementById(`select-contacts-container${n}`).classList.remove('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.add('d-none');
}

function checkNewContactField() {
  let newContactField = document.getElementById(`invite-new-contact${n}`);
  if (newContactField.value.indexOf('@') === -1) {
    addAssignedTowarnings()
  } else {
    clearAssignedTowarnings()
    addInviteContact()
  }
}

async function addInviteContact() {
  let email = document.getElementById(`invite-new-contact${n}`);
  let name = email.value.split('@')[0];
  let phone = ""
  let initials = document.getElementById(`invite-new-contact${n}`).value.charAt(0).toUpperCase();
  contacts.unshift({ name: name, email: email.value, phone: phone, initials: initials });
  await setServer();
  renderContacts()
  closeInviteNewContact()
  renderAddTaskContacts()
  openAddTaskContacts()
}

function clearInviteNewContactValue() {
  document.getElementById(`invite-new-contact${n}`).value = ''
}

function selectContactToAssign() {
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedContacts.push(i);
    }
  }
}

function uncheckSelectedContacts() {
  let checkboxes = document.getElementsByName(`option[]${n}`);
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false 
  }
}

// Funktion, um das aktuelle Datum im Format "yyyy-mm-dd" zu erhalten
function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function setCurrentDate() {
  document.getElementById(`due-date${n}`).setAttribute('min', getCurrentDate());
}

function openSubtask() {
  document.getElementById(`add-new-subtask-container${n}`).classList.add('d-none');
  document.getElementById(`new-subtask-container${n}`).classList.remove('d-none');
}

function closeSubtask() {
  document.getElementById(`add-new-subtask-container${n}`).classList.remove('d-none');
  document.getElementById(`new-subtask-container${n}`).classList.add('d-none');
}

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
    checkbox.addEventListener('change', function() {
      subtask['subtaskDone'] = this.checked;
    });
  }
}



function flyInButton() {
  let flyInButton = document.getElementById(`fly-in-button`);
  flyInButton.classList.remove('d-none');
}

function closeFlyInButton() {
  let flyInButton = document.getElementById(`fly-in-button`);
  flyInButton.classList.add('d-none');
}

function goToBoardPage() {
  let meinButton = document.getElementById('board');
  renderBoard()
  setTimeout(function () {
    meinButton.click();
    document.getElementById(`addTaskForm${n}`).reset()
    deleteAddTaskFields();
    uncheckSelectedContacts();
    closeOverlay()
    closeFlyInButton()
  }, 3000);
}

function updateSubtaskDone(checked, i, index) {

console.log(i)
console.log(index)
    tasks[i].subtasks[index]['subtaskDone'] = checked;
  
}