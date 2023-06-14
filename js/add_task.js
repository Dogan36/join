let title;
let description;
let category
let selectContacts = [];
let dueDate;
let prio;
let tasksJsonArrays = []
let addTaskSelectPrios
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
    iconWhite: 'assets/img/prio-low-white-icon.svg'
  },
  {
    name: 'medium',
    backgroundColor: '#ffa800',
    iconWhite: 'assets/img/prio-medium-white-icon.svg'
  },
  {
    name: 'urgent',
    backgroundColor: '#ff3c0',
    iconWhite: 'assets/img/prio-urgent-white-icon.svg'
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

async function addTask(n) {
  title = document.getElementById(`task-title-input${n}`).value;
  description = document.getElementById(`add-task-description${n}`).value;
  dueDate = document.getElementById(`due-date${n}`).value;
  await addTaskJsonArray(); /* Das addTaskJasonArray() hollt sich die restlichen Punkte aus den globalen Variablen   */
  document.getElementById('myForm').reset()
  deleteAddTaskFields(n);
  await init();
  renderSelectTaskCategory(n);
  deleteSelectedContacts();
  flyIngButton(n)
  goToBoardPage(n)
}




function flyIngButton(n) {
  let flyInButton = document.getElementById(`fly-in-button${n}`);
  flyInButton.classList.remove('d-none');


}



function closeFlyIngButton(n) {
  let flyInButton = document.getElementById(`fly-in-button${n}`);
  flyInButton.classList.add('d-none');
}

function goToBoardPage(n) {
  let meinButton = document.getElementById('board');
  let flyInButton = document.getElementById(`fly-in-button${n}`);
  let addTaskContainer = document.getElementById('content-add-task-container');
  let addTaskWindowOverlayContainer = document.getElementById('container-opened-task');
  let addTaskWindowContainer = document.getElementById('add-task-window');
  let taskaddedtoboardButton = document.getElementById('fly-in-button1');

  setTimeout(function () {

    meinButton.click();
    addTaskWindowOverlayContainer.classList.remove('fade-in-left');
    addTaskContainer.classList.remove('fade-out-right');
    addTaskContainer.classList.add('fade-out-right');
    addTaskWindowContainer.classList.remove('fade-in-left');
    addTaskWindowContainer.classList.add('fade-out-right');
    addTaskWindowOverlayContainer.classList.add('fade-out-right');

  }, 3000);

  setTimeout(function () {

    addTaskContainer.classList.add('fade-out-right');
    taskaddedtoboardButton.classList.add('fade-out-right');

  }, 2000);

  setTimeout(function () {

    addTaskContainer.classList.remove('fade-out-right');
    taskaddedtoboardButton.classList.remove('fade-out-right');

  }, 3000);


}



function clearTheInputFields(n) {
  deleteAddTaskFields(n)
  renderSelectTaskCategory(n);
  deleteSelectedContacts();
  deleteRedBorderAndRequiredText(n)
}



function deleteAddTaskFields(n) {
  document.getElementById(`task-title-input${n}`).value = '';
  document.getElementById(`add-task-description${n}`).value = '';
  document.getElementById(`due-date${n}`).value = '';
  document.getElementById(`add-task-subtask-point${n}`).innerHTML = '';
  /* Prio button initial situation (Prio Button in Ausgangssituation setzen)  */
  resetPrioButtons()
}


function seltionContacts(n) {
  dueDate = document.getElementById(`due-date${n}`).value;
}





function openSubtask(n) {
  document.getElementById(`add-new-subtask-container${n}`).classList.add('d-none');
  document.getElementById(`new-subtask-container${n}`).classList.remove('d-none');
}

function addNewSubtask(n) {
  addSubtask(n);
  closeSubtask(n);
  renderSubtaskPoint(n);
}

function closeSubtask(n) {
  document.getElementById(`add-new-subtask-container${n}`).classList.remove('d-none');
  document.getElementById(`new-subtask-container${n}`).classList.add('d-none');
}

function addSubtask(n) {

  let newSubtask = document.getElementById(`new-subtask-piont${n}`);
  let TaskJasonArray = {
    'subtaskTitle': newSubtask.value,
    'subtaskDone': false
  }
  addTaskNewSubtasks.push(TaskJasonArray);
  newSubtask.value = '';
  console.log(addTaskNewSubtasks)
}

function renderSubtaskPoint(n) {

  let SubtaskPoint = document.getElementById(`add-task-subtask-point${n}`);
  SubtaskPoint.innerHTML = '';
  for (let i = 0; i < addTaskNewSubtasks.length; i++) {
    const point = addTaskNewSubtasks[i];
    SubtaskPoint.innerHTML += `
    <div class="checkbox-container">
      <input class="checkbox" type="checkbox">
      <div>${point['subtaskTitle']}</div>
    </div>`;
  }
}

/**
 * Add Task Jason Array
 */

async function addTaskJsonArray() {
  let taskJsonArray = {
    'taskTitle': title,
    'taskDescription': description,
    'taskCategory': category,
    'assignedTo': selectedContacts,
    'dueDate': dueDate,
    'prio': addTaskSelectPrios,
    'subtasks': addTaskNewSubtasks,
    'taskProgress': 'toDo',
  }
  tasks.push(taskJsonArray);
  await setServer();
}






function deleteRedBorderAndRequiredText(n) {
  clearTitleWarnings(n)
  clearDescriptionWarnings(n)
  clearCategoryWarnings(n)
  clearAssignedTowarnings(n)
  clearDueDateWarnings(n)
  clearPrioWarnings(n)
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
  document.getElementById(`required-category0`).classList.remove('hidden');
  document.getElementById(`required-category0`).innerHTML = 'Please enter name and color'

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
  document.getElementById(`assigned-to-container0`).style.border = '2px solid red';
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
  let divClicked = document.getElementById(`${element}`)
  resetPrioButtons()
  divClicked.classList.add(`${color}`)
  changePrioButtonIcon(element)
}


function changePrioButtonIcon(element) {
  if (element == 'prio-red0') document.getElementById('prio-urgent-icon0').src = 'assets/img/prio-urgent-white-icon.svg'
  if (element == 'prio-yellow0') document.getElementById('prio-medium-icon0').src = 'assets/img/prio-medium-white-icon.svg'
  if (element == 'prio-green0') document.getElementById('prio-low-icon0').src = 'assets/img/prio-low-white-icon.svg'
}


function resetPrioButtons() {
  document.getElementById('prio-red0').classList.remove('prio-red')
  document.getElementById('prio-yellow0').classList.remove('prio-yellow')
  document.getElementById('prio-green0').classList.remove('prio-green')
  document.getElementById('prio-urgent-icon0').src = 'assets/img/prio-urgent-icon.svg'
  document.getElementById('prio-medium-icon0').src = 'assets/img/prio-medium-icon.svg'
  document.getElementById('prio-low-icon0').src = 'assets/img/prio-low-icon.svg'
}


function checkMandatoryFieldTitle(n) {
  let inputFeldTitle = document.getElementById(`task-title-input${n}`);
  if (inputFeldTitle.value === '') addTitleWarnings()
  else clearTitleWarnings()
}


function checkMandatoryFieldDescription(n) {
  let textareaFeldDescription = document.getElementById(`add-task-description${n}`);
  if (textareaFeldDescription.value === '') addDescriptionWarnings()
  else clearDescriptionWarnings()
}


function checkMandatoryFieldAssignedTo(n) {
  let contactClassList = document.getElementById(`contacts${n}`);
  if (selectedContacts.length === 0 && !contactClassList.classList.contains('display-flex')) addAssignedTowarnings()
  else clearAssignedTowarnings()
}


function checkMandatoryFieldDueDate(n) {
  let inputFeldDueDate = document.getElementById(`due-date${n}`);
  if (inputFeldDueDate.value === '') addDueDateWarnings()
  else clearDueDateWarnings()
}


function checkMandatoryFieldCategory(n) {
  console.log(document.querySelector(`.categoryOption.selectTask`));
  if (category=='') addCategoryWarnings()
  else clearCategoryWarnings(n)
}


function checkPrio(n) {
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


function renderAddTaskCategorys(n) {
  let content = document.getElementById(`categorySelection`);
  content.innerHTML = ''
  for (let i = 0; i < categorys.length; i++) {
    const category = categorys[i];
    content.innerHTML += renderAddTaskCategoriesHTML(i, n, category);
  }
}


function renderAddTaskCategoriesHTML(i, n, category) {
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
  let content = document.getElementById(`select-container0`);
  content.innerHTML = `
  <div onclick="toggleAddTaskCategory(0)" class="categoryOption selectTask">
  <input readonly id="select-start-task-category0" class="input-outline"
  placeholder="Select task category"></input>
  <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="" />
</div>
<div id="content-category-container" class="d-none">
  <div onclick="openNewCategoryInput()" class="categoryOption">New Category</div>
  <div id="categorySelection" class=""></div>
</div>`
}


function toggleAddTaskCategory() {
  if (document.getElementById('content-category-container').classList.contains('d-none'))
    openAddTaskCategory()
  else closeAddTaskCategory()
}

function openAddTaskCategory() {
  document.getElementById(`content-category-container`).classList.remove('d-none')
  document.querySelector(`.arrow-icon`).classList.add('arrow-rotate')
}

function closeAddTaskCategory() {
  document.getElementById(`content-category-container`).classList.add('d-none')
  document.querySelector(`.arrow-icon`).classList.remove('arrow-rotate')
  category=''
  checkMandatoryFieldCategory(n)
}


function openNewCategoryInput() {
  clearCategoryWarnings()
  category==''
  document.getElementById('new-category-container0').classList.remove('d-none');
  document.getElementById('color-container0').classList.remove('d-none');
  document.getElementById('select-container0').classList.add('d-none');
}

function closeAddTaskNewCategory(n) {
  document.getElementById('new-category-container0').classList.add('d-none');
  document.getElementById('color-container0').classList.add('d-none');
  document.getElementById('select-container0').classList.remove('d-none');
}

function checkNewCategoryName(n) {
  let name = document.getElementById(`category${n}`);
  let color = document.getElementById(`color-button-container${n}`);
  if (name.value === '' || color.innerHTML === '') addNewCategoryWarning()
  else {
    clearCategoryWarnings()
    addNewCategory(n);
    resetNewCategoryInput(n)
    closeAddTaskNewCategory(0)
    selectCategory(categorys.length - 1)
  }
}

async function addNewCategory(n) {
  let categorytext = document.getElementById(`category${n}`);
  let newCategory = {
    'categorytext': categorytext.value,
    'categoryColor': selectedColor
  }
  categorys.push(newCategory);
  await setServer();
}

function resetNewCategoryInput(n) {
  document.getElementById(`category${n}`).value = "";
  document.getElementById(`color-button-container${n}`).innerHTML = '';
}

async function deleteCategory(i) {
  categorys.splice(i, 1);
  await setServer();
  renderAddTaskCategorys(n)
}

function colorButton(i, n) {
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
    <div onclick="renderAddTaskCategorySelect(); renderAddTaskCategorys(n), toggleAddTaskCategory(0)" class="categoryOption select-task0">
                  <div class="selection-point-container">
                    <div>${category['categorytext']}</div>
                    <div id="color-button-container${n}"><div class="color-category-button" style="background-color :${category['categoryColor']};">  
                    </div></div>
                  </div>
                  <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
                </div>`
}


function renderAddTaskContactsSelect(){
  document.getElementById(`select-contacts-container0`).innerHTML =`
  <div onclick="toggleAddTaskContacts(0)" class="contactsOption">
              <div id="select-start-task-contact">
                Select contacts to assign
              </div>
              <img id="arrow-rotate" class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="" />
            </div>
            <div id="contacts0" class=" d-none">
              </div>
          `
}

function renderAddTaskContacts(){
  let content = document.getElementById(`contacts${n}`);
    content.innerHTML = '';
    // renderCloseTaskCategory(n, content)
    content.innerHTML = `
    <div id="invite-new-contact-container${n}" onclick="openInviteNewContact(${n})" class="contactsOption">
      <div>Invite new contact</div>
      <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
    </div>`;
  
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      content.innerHTML +=/*html*/`
          <div class="contactsOption">
        <div class="selection-point-container">
          <div>${contact['name']}</div>
        </div>
        <div>
          <input id='${contact['name'] + n}' type="checkbox" name="option[]" value="Option ${i}" onclick="selectContactToAssign(${n},'contacts[i]')">
        </div>    
      </div>`;
    }
}







function toggleAddTaskContacts() {
  if (document.getElementById('contacts0').classList.contains('d-none'))
    openAddTaskContacts()
  else closeAddTaskContacts()
}

function openAddTaskContacts() {
  document.getElementById(`contacts0`).classList.remove('d-none')
  document.getElementById(`arrow-rotate`).classList.add('arrow-rotate')
}

function closeAddTaskContacts() {
  document.getElementById(`contacts0`).classList.add('d-none')
  document.getElementById(`arrow-rotate`).classList.remove('arrow-rotate')
  
}

function openInviteNewContact(n) {
  document.getElementById(`select-contacts-container${n}`).classList.add('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.remove('d-none');
}

function closeInviteNewContact(n) {
  clearInviteNewContactValue()
  document.getElementById(`invite-new-contact${n}`).value=''
  document.getElementById(`select-contacts-container${n}`).classList.remove('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.add('d-none');
}

function checkNewContactField(n) {
  let newContactField = document.getElementById(`invite-new-contact${n}`);
  if (newContactField.value.indexOf('@') === -1) {
    addAssignedTowarnings()
  } else {
    clearAssignedTowarnings()
    addInviteContact()
  }
}

async function addInviteContact() {
  debugger
  let email = document.getElementById(`invite-new-contact${n}`);
  let name = email.value.split('@')[0];
  let phone = ""
  let initials = document.getElementById(`invite-new-contact${n}`).value.charAt(0).toUpperCase() ;
  contacts.unshift({ name: name, email: email.value, phone: phone, initials: initials });
  await setServer();
  renderContacts()
  closeInviteNewContact(n)
  renderAddTaskContacts()
  openAddTaskContacts()
}

function clearInviteNewContactValue(){
  document.getElementById(`invite-new-contact${n}`).value=''
}

function selectContactToAssign(n) {
  let checkboxes = document.getElementsByName("option[]");
  // toggleCheckboxes()
  // for (let i = 0; i <(selectedContacts.length); i++) {
  //   let contactName = selectedContacts[i]['name']
  //   if (selectedContacts[i]['name'].includes(contactName) === true) {
  //     document.getElementById(`${selectedContacts[i]['name'] + n}`).checked = true ;
  //   }  
  // }
  console.log(selectedContacts);

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      if (addTaskContacts[i]['name'] && !selectedContacts.some(contact => contact.name === addTaskContacts[i]['name'])) {
        selectedContacts.push(addTaskContacts[i]);
      }
    } else {
      let index = selectedContacts.findIndex(contact => contact.name === addTaskContacts[i].name);
      if (index !== -1) {
        selectedContacts.splice(index, 1);
      }
    }
  }
}