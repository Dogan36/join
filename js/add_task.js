let title;
let description;
let category = [];
let selectContacts = [];
let dueDate;
let prio;
let tasksJsonArrays = []
let addTaskSelectPrios = [];
let addTaskNewSubtasks = [];
// let addTaskNewContacts = [];
// let addTaskNewCategorys = [];
let buttonBackgroundColor = ['#800080', '#ff0000', '#008000', '#ffba00', '#ffc0cb', '#0000ff'];
let selectedCategory;
let selectedColor;



function openNewTaskCategroy(n) {
  document.getElementById(`select-container${n}`).innerHTML = `
    <div onclick="closeNewTaskCategroy(${n})" class="option">
      <div>Select task category</div>
      <img class="arrow-icon" src="assets/img/arrow_top_icon.svg" alt="">
    </div>
    <div id="content-categroy-container${n}" class="">
      <div onclick="openNewCategroy('new-category-container${n}', 'color-container${n}', 'select-container${n}', ${n})" class="option">New Category</div>
    </div>
  `;
  if (categorys.length > 0) {
    addTaskCategory(n);
  }
  document.querySelector('.option').classList.remove('selectTask');


}





function prioColor(color, n) {
  let divRed = document.getElementById(`prio-red${n}`);
  let divYellow = document.getElementById(`prio-yellow${n}`);
  let divGreen = document.getElementById(`prio-green${n}`);
  if (color == 'prio-red') {
    if (divRed.classList.contains('prio-red')) {
      document.getElementById(`prio-red${n}`).classList.remove('prio-red');
      document.getElementById(`prio-urgent-icon${n}`).src = './assets/img/prio-urgent-icon.svg';
      deleteJasonPrio()
    } else {
      document.getElementById(`prio-red${n}`).classList.add('prio-red');
      document.getElementById(`prio-urgent-icon${n}`).src = 'assets/img/prio-urgent-white-icon.svg';
      document.getElementById(`prio-medium-icon${n}`).src = 'assets/img/prio-medium-icon.svg';
      document.getElementById(`prio-low-icon${n}`).src = 'assets/img/prio-low-icon.svg';
      document.getElementById(`prio-yellow${n}`).classList.remove('prio-yellow');
      document.getElementById(`prio-green${n}`).classList.remove('prio-green');
      deleteJasonPrio()
    }

  } else if (color == 'prio-yellow') {
    if (divYellow.classList.contains("prio-yellow")) {
      document.getElementById(`prio-yellow${n}`).classList.remove('prio-yellow');
      document.getElementById(`prio-medium-icon${n}`).src = './assets/img/prio-medium-icon.svg';
      deleteJasonPrio();
    } else {

      document.getElementById(`prio-yellow${n}`).classList.add('prio-yellow');
      document.getElementById(`prio-medium-icon${n}`).src = './assets/img/prio-medium-white-icon.svg';
      document.getElementById(`prio-urgent-icon${n}`).src = './assets/img/prio-urgent-icon.svg';
      document.getElementById(`prio-low-icon${n}`).src = './assets/img/prio-low-icon.svg';
      document.getElementById(`prio-red${n}`).classList.remove('prio-red');
      document.getElementById(`prio-green${n}`).classList.remove('prio-green');
      deleteJasonPrio();
    }

  } else if (color == 'prio-green') {
    if (divGreen.classList.contains("prio-green")) {
      document.getElementById(`prio-green${n}`).classList.remove('prio-green');
      document.getElementById(`prio-low-icon${n}`).src = './assets/img/prio-low-icon.svg';
      deleteJasonPrio();
    } else {

      document.getElementById(`prio-green${n}`).classList.add('prio-green');
      document.getElementById(`prio-low-icon${n}`).src = './assets/img/prio-low-white-icon.svg';
      document.getElementById(`prio-urgent-icon${n}`).src = './assets/img/prio-urgent-icon.svg';
      document.getElementById(`prio-medium-icon${n}`).src = './assets/img/prio-medium-icon.svg';
      document.getElementById(`prio-red${n}`).classList.remove('prio-red');
      document.getElementById(`prio-yellow${n}`).classList.remove('prio-yellow');
      deleteJasonPrio();
    }
  }
  // selectPrio(name, colorNumber, colorIcon, whiteIcon);
}



function closeSelectContactEmail(n) {
  document.getElementById(`new-subtask-container${n}`).classList.add('d-none');
  document.getElementById(`add-new-subtask-container${n}`).classList.remove('d-none');
}








/**
 * click on task button 
 */

async function createTaskButton(n) {
  checkMandatoryFields(n);
  headtitle(n);
  descriptionText(n);
  selectionDueDate(n);
  await addTaskJasonArray(); /* Das addTaskJasonArray() hollt sich die restlichen Punkte aus den globalen Variablen   */
  deleteAddTaskFields(n);
  await init();
  renderSelectOpenTaskCategory(n)
 }

/**
 * click on task button 
 */

function deleteAddTaskFields(n) {
  document.getElementById(`task-title-input${n}`).value = '';
  document.getElementById(`add-task-description${n}`).value = '';
  document.getElementById(`due-date${n}`).value = '';
  document.getElementById(`add-task-subtask-point${n}`).innerHTML = '';
  /* Prio button initial situation (Prio Button in Ausgangssituation setzen)  */
  document.getElementById(`prio-red${n}`).classList.remove('prio-red');
  document.getElementById(`prio-urgent-icon${n}`).src = './assets/img/prio-urgent-icon.svg';
  document.getElementById(`prio-yellow${n}`).classList.remove('prio-yellow');
  document.getElementById(`prio-medium-icon${n}`).src = './assets/img/prio-medium-icon.svg';
  document.getElementById(`prio-green${n}`).classList.remove('prio-green');
  document.getElementById(`prio-low-icon${n}`).src = './assets/img/prio-low-icon.svg';
}


/**
 * Add Task Title 
 */

function headtitle(n) {
  title = document.getElementById(`task-title-input${n}`).value;
  console.log(title);
}

/**
 * Add Task Description 
 */

function descriptionText(n) {
  description = document.getElementById(`add-task-description${n}`).value;
  console.log(description);
}

/**
 * Add Task Category  //info testen ob wirklich alle Punkte drinne sind 
 */

function loadNewCategoryInDropdownButtonCategory(n) {
  
  addTaskNewCategory(n);
  addTaskCategory(n);
}


async function addTaskNewCategory(n) {
  let categorytext = document.getElementById(`category${n}`);

  let addTaskNewCategorys = {
    'categorytext': categorytext.value,
    'categoryColor': selectedColor
  }

  categorys.push(addTaskNewCategorys);
  categorytext.value = '';
  document.getElementById(`color-button-container${n}`).innerHTML = ""; // Deletes the color in the input field (Löscht die Colorfabe in dem Eingabefeld)
  await setServer(); /* setSverver loads the current data from the server (setSverver lädt die aktuellen daten vom server) */
  console.log(categorys);
  
 
  

}

async function deleteCategory(i, n) {
  categorys.splice(i, 1);
  await setServer(); /* setSverver loads the current data from the server (setSverver lädt die aktuellen daten vom server) */
  await addTaskCategory(n)
}



async function addTaskCategory(n) {
  // closeNewTaskCategroy(n);
  let content = document.getElementById(`select-container${n}`);
  renderSelectCloseTaskCategory(n, content)

  for (let i = 0; i < categorys.length; i++) {
    const category = categorys[i];
    content.innerHTML +=/*html*/`
    <div class="option" onclick="selectCategory(${i}, ${n}); checkMandatoryFieldCategory(${n});">
      <div class="selection-point-container">
        <div>${category['categorytext']}</div>
        <div class="color" style="background-color: ${category['categoryColor']}"></div>
      </div>
      <div class="color-and-delete-icon-container">
        <img onclick="deleteCategory(${i}, ${n})" class="delete-icon" src = "./assets/img/delete.png" alt = "" >
      </div>
      
    </div>
  `;
  }


}

function colorButton(i, n) {

  selectedColor = '';
  selectedColor = buttonBackgroundColor[i];
  document.getElementById(`color-button-container${n}`).innerHTML = `<div class="color-category-button" style="background-color :${selectedColor};"></div>`;


}

async function openNewCategroy(oneCategroy, twoCategroy, threeCategroy, n) {
  document.getElementById(oneCategroy).classList.remove('d-none');
  document.getElementById(twoCategroy).classList.remove('d-none');
  document.getElementById(threeCategroy).classList.add('d-none');
  DeleteTheContentOfTheInputField(n)
  
 }

function DeleteTheContentOfTheInputField(n){
  document.getElementById(`new-category-container${n}`).value = "";
  document.getElementById(`color-button-container${n}`).innerHTML = '';
}

function closeNewTaskCategroy(n) {
  document.getElementById(`new-category-container${n}`).classList.add('d-none');
  document.getElementById(`content-categroy-container${n}`).classList.add('d-none');
  document.getElementById(`color-container${n}`).classList.add('d-none');
  document.getElementById(`select-container${n}`).classList.remove('d-none');
  renderSelectOpenTaskCategory(n);
  


}


function renderSelectOpenTaskCategory(n) {

  document.getElementById(`select-container${n}`).innerHTML = ``;
  document.getElementById(`select-container${n}`).innerHTML = `<div onclick="openNewTaskCategroy(${n}); checkMandatoryFieldCategory(${n});" class="option selectTask">
    <div id="select-open-task-category${n}">Select task category</div>
    <img  class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
  </div>
  <div id="content-categroy-container${n}" class="d-none">
    <div onclick="openNewCategroy('new-category-container${n}', 'color-container${n}', 'select-container${n}', ${n})" class="option">New Category</div>
  </div>
  `;

}
function renderSelectCloseTaskCategory(n, content) {
  content.innerHTML = '';
  content.innerHTML = `<div class="option selectTask" onclick="closeNewTaskCategroy(${n}); checkMandatoryFieldCategory(${n}); ">
    <div id="select-close-task-category${n}">Select task category</div>
    <img  class="arrow-icon" src="./assets/img/arrow_top_icon.svg" alt="">
  </div>
  <div id="content-categroy-container${n}">
    <div onclick="openNewCategroy('new-category-container${n}', 'color-container${n}', 'select-container${n}', ${n})" class="option">New Category</div>
  </div>
  `;
}



function selectCategory(i, n) {
  let category = categorys[i];

  document.getElementById(`select-container${n}`).innerHTML =/*html*/`
  <div onclick="openNewTaskCategroy(${n}); checkMandatoryFieldCategory(${n});" class="option">
                <div class="selection-point-container">
                  <div>${category['categorytext']}</div>
                  <div id="color-button-container${n}"><div class="color-category-button" style="background-color :${category['categoryColor']};">  
                  </div></div>
                </div>
                <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
              </div>
  `;
  pushPointsInCategoryArray(category['categorytext'], category['categoryColor'] )
 
}

function pushPointsInCategoryArray(categorytext, categoryColor) {
  deletePointsInCategoryArray();
  category.push({'categorytext': categorytext, 'categoryColor': categoryColor});
}

function deletePointsInCategoryArray() {
  category.splice(0, category.length); 
}



/**
 *  Add Task Assigned to
 */

function seltionContacts(n) {
  dueDate = document.getElementById(`due-date${n}`).value;
}


function inviteNewContact(n) {
  document.getElementById(`select-contacts-container${n}`).classList.add('d-none');
  document.getElementById(`assigned-to-container${n}`).classList.remove('d-none'); 
}

function openSelectContactsToAssign(n) {
  deleteAddTaskContacts()
  document.getElementById(`select-contacts-container${n}`).innerHTML = ``;
  document.getElementById(`select-contacts-container${n}`).innerHTML = `
  <div onclick="closeSelectContactsToAssign(${n}); checkMandatoryFieldAssignedTo(${n})" class="option display-flex">
    <div>Select contacts to assign</div>
    <img class="arrow-icon" src="assets/img/arrow_top_icon.svg" alt="">
  </div>
    <div id="invite-new-contact-container${n}" onclick="inviteNewContact(${n})"" class="option">
      <div>Invite new contact</div>                       
    <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
  </div>
  `;
  loadContactsInAddTaskContacts()
  loadNewContactsInAddTaskContacts()
  renderAddTaskContacts(n)
}

function closeSelectContactsToAssign(n) {
  document.getElementById(`invite-new-contact${n}`).value ="";
  document.getElementById(`assigned-to-container${n}`).classList.add('d-none');
  document.getElementById(`select-contacts-container${n}`).classList.remove('d-none');
  // document.getElementById(`invite-new-contact-container${n}`).classList.add('d-none');
  // document.getElementById(`select-contacts-container${n}`).innerHTML = `
  // <div onclick="openSelectContactsToAssign(${n}); checkMandatoryFieldAssignedTo(${n});" class="option selectTaskAssignedTo">
  //   <div>Select contacts to assign</div>
  //   <img class="arrow-icon" src="assets/img/arrow_icon.svg" alt="">
  // </div>
  // `;

}



 function openAndCloseContacts(n) {
  document.getElementById(`contacts${n}`).classList.toggle('display-flex');
  document.getElementById(`arrow-rotate`).classList.toggle('arrow-rotate');
  deleteAddTaskContacts()
  loadNewContactsInAddTaskContacts()
  loadContactsInAddTaskContacts()
  renderAddTaskContacts(n);
  getSelectedOptionsContacts(n)
}

function getSelectedOptionsContacts(n) {
  let checkboxes = document.getElementsByName("option[]");
  // toggleCheckboxes()
  for (let i = 0; i <(selectedContacts.length); i++) {
    let contactName = selectedContacts[i]['name']
    if (selectedContacts[i]['name'].includes(contactName) === true) {
      document.getElementById(`${selectedContacts[i]['name'] + n}`).checked = true ;
    }  
  }
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


async function renderAddTaskContacts(n) {

  let content = document.getElementById(`contacts${n}`);
  content.innerHTML ='';
  // renderSelectCloseTaskCategory(n, content)
  content.innerHTML = `
  <div id="invite-new-contact-container${n}" onclick="inviteNewContact(${n})" class="option">
    <div>Invite new contact</div>
    <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
  </div>`;
  

  for (let i = 0; i < addTaskContacts.length; i++) {
    const contact = addTaskContacts[i];
    content.innerHTML +=/*html*/`
        <div class="option">
      <div class="selection-point-container" onclick="renderSelectContact(${i}, ${n})" >
        <div>${contact['name']}</div>
      </div>
      <div>
        <input id='${contact['name'] + n}' type="checkbox" name="option[]" value="Option ${i}"    onclick="getSelectedOptionsContacts(${n},'${contact['name']}')">
      </div>
      
    </div>
  `;
  }

}


/* Gets the email address from the New Contact field and puts it into the addTaskNewContacts array (Holt die E-Mail-Adresse aus dem Feld „Neuer Kontakt“ raus und fügt sie in das Array „addTaskNewContacts“ ein)*/ 
async function invitenNewContact(n) {
  let inviteNewContact = document.getElementById(`invite-new-contact${n}`);
  console.log(inviteNewContact.value)
  deleteAddTaskContacts()
  addTaskNewContacts.push(inviteNewContact.value)
  loadNewContactsInAddTaskContacts()
  loadContactsInAddTaskContacts();
  await setServer();
  closeSelectContactsToAssign(n)
  renderAddTaskContacts(n);
  
  
}

function loadContactsInAddTaskContacts() {
  
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    addTaskContacts.push(contact)
  }
  // loadNewContactsInAddTaskContacts()
}

/*set array (add Task Contacts) to empty*/
function deleteAddTaskContacts() {
  
  addTaskContacts.splice(0, addTaskContacts.length)
}
 
function loadNewContactsInAddTaskContacts() {
  for (let i = 0; i < addTaskNewContacts.length; i++) {
    // const element = addTaskNewContacts[i];
    
  let newContactArray = {
    'name': addTaskNewContacts[i].split('@')[0],
    'phone': '',
    'email': addTaskNewContacts[i],
    'userInitials': addTaskNewContacts[i][0]
  }
    addTaskContacts.unshift(newContactArray)
}
  
}





function renderSelectContact(i, n) {
  let contact = addTaskContacts[i];

  // document.getElementById(`select-contacts-container${n}`).innerHTML =/*html*/`
  // <div onclick="openSelectContactsToAssign(${n}); checkMandatoryFieldAssignedTo(${n});" class="option selectTaskAssignedTo">
  //               <div class="selection-point-container">
  //                 <div>${contact['name']}</div>
  //               </div>
  //                 <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
  //               </div>
  // `;
  selectContacts.push(contact); 
  
}



/**
 *  Add Task Due date
 */

function selectionDueDate(n) {
  dueDate = document.getElementById(`due-date${n}`).value;
  console.log(dueDate);
}

/**
 *  Add Task Prio
 */

function selectPrioOnOrOff(color, test, name, colorNumber, colorIcon, whiteIcon, n) {
  let divColor = test = document.getElementById(color+n);
  // let divYellow = document.getElementById('prio-yellow');
  // let divGreen = document.getElementById('prio-green');
  prioColor(color, n);

  if (divColor.classList.contains(color)) {
    selectPrio(name, colorNumber, colorIcon, whiteIcon);
  }
}

function selectPrio(name, colorNumber, colorIcon, whiteIcon) {
  let prio = {
    'name': name,
    'backgroundColor': colorNumber,
    'iconColor': colorIcon,
    'iconWhite': whiteIcon
  }
  addTaskSelectPrios.push(prio);
  console.log(addTaskSelectPrios)
}

function deleteJasonPrio() {
  // addTaskSelectPrios[0].splice(1,1);
  for (let i = addTaskSelectPrios.length - 1; i >= 0; i--) {
    addTaskSelectPrios.splice(i, 1);
  }
}

/**
 *  Add Task Subtasks
 */

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
    </div>
    `;
  }
}

/**
 * Add Task Jason Array
 */

async function addTaskJasonArray() {
  let TaskJasonArray = {
    'taskTitle': title,
    'taskDescription': description,
    'taskCategory': category[0],
    'assignedTo': selectedContacts,
    'dueDate': dueDate,
    'prio': addTaskSelectPrios,
    'subtasks': addTaskNewSubtasks,
    'taskProgress': 'toDo',
  }
  tasks.push(TaskJasonArray);
  await setServer();
  console.log(tasks);
}

/**
 * check mandatory fields to see if they are filled out (pflichtfelder prüfen ob sie ausgefüllt sind)
 */

 function checkMandatoryFields(n) {
   checkMandatoryFieldTitle(n);
   checkMandatoryFieldDescription(n);
   checkMandatoryFieldCategory(n);
   checkMandatoryFieldAssignedTo(n);
   checkMandatoryFieldDueDate(n);
}


function checkMandatoryFieldCategory(n) {
  
  if (document.querySelector('.option.selectTask') !== null) {
    document.getElementById(`required-category${n}`).classList.remove('hidden');
    document.getElementById(`select-container${n}`).style.border = '2px solid red';
  } else {
    document.getElementById(`required-category${n}`).classList.add('hidden');
    document.getElementById(`select-container${n}`).style = '';
  }  
  
}

function checkMandatoryFieldTitle(n) {
  let inputFeldTitle = document.getElementById(`task-title-input${n}`); 

  if (inputFeldTitle.value === '') {
    document.getElementById(`required-title${n}`).classList.remove('hidden');
    document.getElementById(`task-title-input${n}`).style.border = '2px solid red';
  } else {
    document.getElementById(`required-title${n}`).classList.add('hidden');
    document.getElementById(`task-title-input${n}`).style = '';
  }
}

function checkMandatoryFieldDescription(n) {
  let textareaFeldDescription = document.getElementById(`add-task-description${n}`);

  if (textareaFeldDescription.value === '') {
    document.getElementById(`required-description${n}`).classList.remove('hidden');
    document.getElementById(`add-task-description${n}`).style.border = '2px solid red';
  } else {
    document.getElementById(`required-description${n}`).classList.add('hidden');
    document.getElementById(`add-task-description${n}`).style = '';
  }
}

function checkMandatoryFieldAssignedTo(n) {
  // let divFeldAssignedTo = document.getElementById(`Select contacts to assign${n}`);

  if (document.querySelector('.option.selectTaskAssignedTo') !== null) {
    document.getElementById(`required-assigned-to${n}`).classList.remove('hidden');
    document.getElementById(`select-contacts-container${n}`).style.border = '2px solid red';
  } else {
    document.getElementById(`required-assigned-to${n}`).classList.add('hidden');
    document.getElementById(`select-contacts-container${n}`).style = '';
  }
}

function checkMandatoryFieldDueDate(n) {
  let inputFeldDueDate = document.getElementById(`due-date${n}`);

  if (inputFeldDueDate.value === '') {
    document.getElementById(`required-due-date${n}`).classList.remove('hidden');
    document.getElementById(`due-date${n}`).style.border = '2px solid red';
  } else {
    document.getElementById(`required-due-date${n}`).classList.add('hidden');
    document.getElementById(`due-date${n}`).style = '';
  } 

}

function checkNewCategoryName(n) {
  let name = document.getElementById(`category${n}`);
  let color = document.getElementById(`color-button-container${n}`);

  if (name.value === '' || color.style === '' ){
    document.getElementById(`new-category-container${n}`).style.border = '2px solid red';
    document.getElementById(`notice-new-category${n}`).classList.remove('hidden');

  } else {
    document.getElementById(`notice-new-category${n}`).classList.add('hidden');
    document.getElementById(`new-category-container${n}`).style = '';
    closeNewTaskCategroy(n)
    loadNewCategoryInDropdownButtonCategory(n)
    
  }
}