let title;
let description;
let category;
let assignedTo;
let dueDate;
let prio;
let tasksJsonArrays = []
let addTaskSelectPrios = [];
let addTaskNewSubtasks = [];
let addTaskNewContacts = [];
let addTaskNewCategorys = [];
let buttonBackgroundColor = ['#800080', '#ff0000', '#008000', '#ffba00', '#ffc0cb', '#0000ff'];
let selectedCategory;
let selectedColor;

function openNewCategroy(oneCategroy, twoCategroy, threeCategroy) {
  document.getElementById(oneCategroy).classList.remove('d-none');
  document.getElementById(twoCategroy).classList.remove('d-none');
  document.getElementById(threeCategroy).classList.add('d-none');
  document.getElementById('category').value = '';
  document.getElementById('color-button-container').innerHTML = '';
}

function closeNewTaskCategroy() {
  document.getElementById('new-category-contaier').classList.add('d-none');
  document.getElementById('content-categroy-container').classList.add('d-none');
  document.getElementById('color-container').classList.add('d-none');
  document.getElementById('select-container').classList.remove('d-none');
  document.getElementById('select-container').innerHTML = ``;
  document.getElementById('select-container').innerHTML = `<div onclick="openNewTaskCategroy()" class="option">
    <div>Select task category</div>
    <img  class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
  </div>
  <div id="content-categroy-container" class="d-none">
    <div onclick="openNewCategroy('new-category-contaier', 'color-container', 'select-container')" class="option">New Category</div>
  </div>
  `;


}

function openNewTaskCategroy() {
  document.getElementById('select-container').innerHTML = `
    <div onclick="closeNewTaskCategroy()" class="option">
      <div>Select task category</div>
      <img class="arrow-icon" src="assets/img/arrow_top_icon.svg" alt="">
    </div>
    <div id="content-categroy-container" class="">
      <div onclick="openNewCategroy('new-category-contaier', 'color-container', 'select-container')" class="option">New Category</div>
    </div>
  `;
  if (addTaskNewCategorys.length > 0) {
    addTaskCategory();
  }



}


function openSelectContactsToAssign() {
  document.getElementById('select-contacts-container').innerHTML = ``;
  document.getElementById('select-contacts-container').innerHTML = `
  <div onclick="closeSelectContactsToAssign()" class="option">
    <div>Select contacts to assign</div>
    <img class="arrow-icon" src="assets/img/arrow_top_icon.svg" alt="">
  </div>
  <div id="invite-new-contact-container" onclick="openNewCategroy('Assigned-to-contaier', 'select-contacts-container', 'select-contacts-container')"" class="option">
    <div>Invite new contact</div>
    <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
  </div>
  `;

}

function closeSelectContactsToAssign() {
  document.getElementById('Assigned-to-contaier').classList.add('d-none');
  document.getElementById('select-contacts-container').classList.remove('d-none');
  document.getElementById('invite-new-contact-container').classList.add('d-none');
  document.getElementById('select-contacts-container').innerHTML = `
  <div onclick="openSelectContactsToAssign()" class="option">
    <div>Select contacts to assign</div>
    <img class="arrow-icon" src="assets/img/arrow_icon.svg" alt="">
  </div>
  `;
}


function prioColor(color) {
  let divRed = document.getElementById('prio-red');
  let divYellow = document.getElementById('prio-yellow');
  let divGreen = document.getElementById('prio-green');
  if (color == 'prio-red') {
    if (divRed.classList.contains("prio-red")) {
      document.getElementById('prio-red').classList.remove('prio-red');
      document.getElementById('prio-urgent-icon').src = './assets/img/prio-urgent-icon.svg';
      deleteJasonPrio()
    } else {
      document.getElementById('prio-red').classList.add('prio-red');
      document.getElementById('prio-urgent-icon').src = 'assets/img/prio-urgent-white-icon.svg';
      document.getElementById('prio-medium-icon').src = 'assets/img/prio-medium-icon.svg';
      document.getElementById('prio-low-icon').src = 'assets/img/prio-low-icon.svg';
      document.getElementById('prio-yellow').classList.remove('prio-yellow');
      document.getElementById('prio-green').classList.remove('prio-green');
      deleteJasonPrio()
    }



  } else if (color == 'prio-yellow') {
    if (divYellow.classList.contains("prio-yellow")) {
      document.getElementById('prio-yellow').classList.remove('prio-yellow');
      document.getElementById('prio-medium-icon').src = './assets/img/prio-medium-icon.svg';
      deleteJasonPrio();
    } else {

      document.getElementById('prio-yellow').classList.add('prio-yellow');
      document.getElementById('prio-medium-icon').src = './assets/img/prio-medium-white-icon.svg';
      document.getElementById('prio-urgent-icon').src = './assets/img/prio-urgent-icon.svg';
      document.getElementById('prio-low-icon').src = './assets/img/prio-low-icon.svg';
      document.getElementById('prio-red').classList.remove('prio-red');
      document.getElementById('prio-green').classList.remove('prio-green');
      deleteJasonPrio();
    }

  } else if (color == 'prio-green') {
    if (divGreen.classList.contains("prio-green")) {
      document.getElementById('prio-green').classList.remove('prio-green');
      document.getElementById('prio-low-icon').src = './assets/img/prio-low-icon.svg';
      deleteJasonPrio();
    } else {

      document.getElementById('prio-green').classList.add('prio-green');
      document.getElementById('prio-low-icon').src = './assets/img/prio-low-white-icon.svg';
      document.getElementById('prio-urgent-icon').src = './assets/img/prio-urgent-icon.svg';
      document.getElementById('prio-medium-icon').src = './assets/img/prio-medium-icon.svg';
      document.getElementById('prio-red').classList.remove('prio-red');
      document.getElementById('prio-yellow').classList.remove('prio-yellow');
      deleteJasonPrio();
    }
  }
  // selectPrio(name, colorNumber, colorIcon, whiteIcon);
}



function closeSelectContactEmail() {
  document.getElementById('new-subtask-contaier').classList.add('d-none');
  document.getElementById('Add-new-subtask-contaier').classList.remove('d-none');
}


// JavaScript for Add Task in the Board-page
function popUpWindowaddTask() {
  document.getElementById('container-opened-task').classList.remove('d-none');
  document.getElementById('add-task-window').classList.remove('d-none');
}

function popUpWindowCloseAddTask() {
  document.getElementById('container-opened-task').classList.add('d-none');
  document.getElementById('add-task-window').classList.add('d-none');
}





/**
 * click on task button 
 */

function createTaskButton() {
  headtitle();
  descriptionText();
  selectionDueDate();
  addTaskJasonArray();
  deleteAddTaskFields();
}

/**
 * click on task button 
 */

function deleteAddTaskFields() {
  document.getElementById('task-title-input').value = '';
  document.getElementById('add-task-description').value = '';
  document.getElementById('due-date').value = '';
  document.getElementById('add-task-subtask-point').innerHTML = '';
  /* Prio button initial situation (Prio Button in Ausgangssituation setzen)  */
  document.getElementById('prio-red').classList.remove('prio-red');
  document.getElementById('prio-urgent-icon').src = './assets/img/prio-urgent-icon.svg';
  document.getElementById('prio-yellow').classList.remove('prio-yellow');
  document.getElementById('prio-medium-icon').src = './assets/img/prio-medium-icon.svg';
  document.getElementById('prio-green').classList.remove('prio-green');
  document.getElementById('prio-low-icon').src = './assets/img/prio-low-icon.svg';
}


/**
 * Add Task Title 
 */

function headtitle() {
  title = document.getElementById('task-title-input').value;
  console.log(title);
}

/**
 * Add Task Description 
 */

function descriptionText() {
  description = document.getElementById('add-task-description').value;
  console.log(description);
}

/**
 * Add Task Category  //info testen ob wirklich alle Punkte drinne sind 
 */

function loadNewCategoryInDropdownButtonCategory() {
  addTaskNewCategory();
  addTaskCategory();
}


function addTaskNewCategory() {
  let categorytext = document.getElementById('category');

  let addTaskNewCategory = {
    'categorytext': categorytext.value,
    'categoryColor': selectedColor
  }

  addTaskNewCategorys.push(addTaskNewCategory);
  categorytext.value = '';
  console.log(addTaskNewCategorys);

}



function addTaskCategory() {
  closeNewTaskCategroy();
  let content = document.getElementById('select-container');
  content.innerHTML = '';
  content.innerHTML = `<div onclick="closeNewTaskCategroy()" class="option">
    <div>Select task category</div>
    <img  class="arrow-icon" src="./assets/img/arrow_top_icon.svg" alt="">
  </div>
  <div id="content-categroy-container">
    <div onclick="openNewCategroy('new-category-contaier', 'color-container', 'select-container')" class="option">New Category</div>
  </div>
  `;

  for (let i = 0; i < addTaskNewCategorys.length; i++) {
    const category = addTaskNewCategorys[i];
    content.innerHTML +=/*html*/`
    <div class="option" onclick="selectCategory(${i})">
      <div class="selection-point-container">
        <div>${category['categorytext']}</div>
        <div class="color" style="background-color: ${category['categoryColor']}"></div>
      </div>
      <div class="color-and-delete-icon-container">
        <img class="delete-icon" src = "./assets/img/delete.png" alt = "" >
      </div>
      
    </div>
  `;
  }


}

function colorButton(i) {

  selectedColor = '';
  selectedColor = buttonBackgroundColor[i];
  document.getElementById('color-button-container').innerHTML = `<div class="color-category-button" style="background-color :${selectedColor};"></div>`;


}




function selectCategory(i) {
  let category = addTaskNewCategorys[i];

  document.getElementById('select-container').innerHTML =/*html*/`
  <div onclick="openNewTaskCategroy()" class="option">
                <div class="selection-point-container">
                  <div>${category['categorytext']}</div>
                  <div id="color-button-container"><div class="color-category-button" style="background-color :${category['categoryColor']};">  
                  </div></div>
                </div>
                <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
              </div>
  `;
}

/**
 *  Add Task Assigned to
 */



/**
 *  Add Task Due date
 */

function selectionDueDate() {
  dueDate = document.getElementById('due-date').value;
  console.log(dueDate);
}

/**
 *  Add Task Prio
 */

function selectPrioOnOrOff(color, test, name, colorNumber, colorIcon, whiteIcon) {
  let divColor = test = document.getElementById(color);
  // let divYellow = document.getElementById('prio-yellow');
  // let divGreen = document.getElementById('prio-green');
  prioColor(color);

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

function openSubtask() {
  document.getElementById('Add-new-subtask-contaier').classList.add('d-none');
  document.getElementById('new-subtask-contaier').classList.remove('d-none');
}

function addNewSubtask() {
  addSubtask();
  closeSubtask();
  renderSubtaskPoint();
}

function closeSubtask() {
  document.getElementById('Add-new-subtask-contaier').classList.remove('d-none');
  document.getElementById('new-subtask-contaier').classList.add('d-none');
}

function addSubtask() {

  let newSubtask = document.getElementById('new-subtask-piont');
  addTaskNewSubtasks.push(newSubtask.value);
  newSubtask.value = '';
  console.log(addTaskNewSubtasks)
}

function renderSubtaskPoint() {

  let SubtaskPoint = document.getElementById('add-task-subtask-point');
  SubtaskPoint.innerHTML = '';

  for (let i = 0; i < addTaskNewSubtasks.length; i++) {
    const point = addTaskNewSubtasks[i];
    SubtaskPoint.innerHTML += `
    <div class="checkbox-container">
      <input class="checkbox" type="checkbox">
      <div>${point}</div>
    </div>
    `;
  }
}

/**
 * Add Task Jason Array
 */

function addTaskJasonArray() {
  let TaskJasonArray = {
    'title': title,
    'description': description,
    'category': addTaskNewCategorys,
    'assingnedTo': assignedTo,
    'dueDate': dueDate,
    'prio': addTaskSelectPrios,
    'subtasks': addTaskNewSubtasks
  }
  tasksJsonArrays.push(TaskJasonArray);
  console.log(TaskJasonArray);
}

/**
 * Load Data on the Server 
 */

function AddTaskJasonToLoadSever() {
    
}




