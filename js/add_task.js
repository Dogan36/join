
function openNewCategroy(oneCategroy, twoCategroy, threeCategroy) {
    document.getElementById(oneCategroy).classList.remove('d-none');
    document.getElementById(twoCategroy).classList.remove('d-none');
    document.getElementById(threeCategroy).classList.add('d-none');

}

function closeNewTaskCategroy() {
    document.getElementById('new-category-contaier').classList.add('d-none');
    document.getElementById('color-container').classList.add('d-none');
    document.getElementById('select-container').classList.remove('d-none');
    document.getElementById('select-container').innerHTML =``;
    document.getElementById('select-container').innerHTML =`<div onclick="openNewTaskCategroy()" class="option">
    <div>Select task category</div>
    <img  class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
  </div>`;
    

}

function openNewTaskCategroy() {
    document.getElementById('select-container').innerHTML =``;
    document.getElementById('select-container').innerHTML =`
    <div onclick="closeNewTaskCategroy()" class="option">
      <div>Select task category</div>
      <img class="arrow-icon" src="./assets/img/arrow_top_icon.svg" alt="">
    </div>
    <div onclick="openNewCategroy('new-category-contaier', 'color-container', 'select-container')" class="option">New Category</div>`;
}


function openSelectContactsToAssign() {
  document.getElementById('select-contacts-container').innerHTML= ``;
  document.getElementById('select-contacts-container').innerHTML= `
  <div onclick="closeSelectContactsToAssign()" class="option">
    <div>Select contacts to assign</div>
    <img class="arrow-icon" src="./assets/img/arrow_top_icon.svg" alt="">
  </div>
  <div id="invite-new-contact-container" onclick="openNewCategroy('Assigned-to-contaier', 'select-contacts-container', 'select-contacts-container')"" class="option">
    <div>Invite new contact</div>
    <img class="contact-icon" src="./assets/img/contact_icon.svg" alt="">
  </div>
  `;

}

function closeSelectContactsToAssign() {
  document.getElementById('Assigned-to-contaier').classList.add('d-none');
  document.getElementById('select-contacts-container').classList.remove('d-none');
  document.getElementById('invite-new-contact-container').classList.add('d-none');
  document.getElementById('select-contacts-container').innerHTML= `
  <div onclick="openSelectContactsToAssign()" class="option">
    <div>Select contacts to assign</div>
    <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
  </div>
  `;
}


function prioColor(color) {

  if(color == 'prio-red') {
    document.getElementById('prio-red').classList.add('prio-red')
    document.getElementById('prio-yellow').classList.remove('prio-yellow');
    document.getElementById('prio-green').classList.remove('prio-green');
    document.getElementById('prio-urgent-white-icon').classList.remove('d-none');
    document.getElementById('prio-urgent-icon').classList.add('d-none');
    document.getElementById('prio-medium-icon').classList.remove('d-none');
    document.getElementById('prio-low-icon').classList.remove('d-none');
    
    
  
  }else if (color == 'prio-yellow') {
    document.getElementById('prio-yellow').classList.add('prio-yellow');
    document.getElementById('prio-red').classList.remove('prio-red');
    document.getElementById('prio-green').classList.remove('prio-green');
    document.getElementById('prio-medium-white-icon').classList.remove('d-none');
    document.getElementById('prio-medium-icon').classList.add('d-none');
    document.getElementById('prio-urgent-icon').classList.remove('d-none');
    document.getElementById('prio-urgent-white-icon').classList.add('d-none');
    document.getElementById('prio-low-icon').classList.remove('d-none');
    
    
    
  
    
  }else if (color == 'prio-green'){
    document.getElementById('prio-green').classList.add('prio-green');
    document.getElementById('prio-red').classList.remove('prio-red');
    document.getElementById('prio-yellow').classList.remove('prio-yellow');
    document.getElementById('prio-low-white-icon').classList.remove('d-none');
    document.getElementById('prio-low-icon').classList.add('d-none');
    document.getElementById('prio-urgent-icon').classList.remove('d-none');
    document.getElementById('prio-medium-white-icon').classList.add('d-none');
    document.getElementById('prio-medium-icon').classList.remove('d-none');
}
} 

function openSubtasks() {
  document.getElementById('Add-new-subtask-contaier').classList.add('d-none');
  document.getElementById('contact-email-contaier').classList.remove('d-none');
  
}

function closeSelectContactEmail() {
  document.getElementById('contact-email-contaier').classList.add('d-none');
  document.getElementById('Add-new-subtask-contaier').classList.remove('d-none');
}


// JavaScript for Add Task in the Board-page
function addTask() {
  document.getElementById('container-opened-task').classList.remove('d-none');
  document.getElementById('add-task-window').classList.remove('d-none');
}

function closeAddTask() {
  document.getElementById('container-opened-task').classList.add('d-none');
  document.getElementById('add-task-window').classList.add('d-none');
}












