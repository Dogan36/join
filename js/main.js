setURL('https://gruppenarbeit-485join.developerakademie.net/join/smallest_backend_ever')
let tasks = []
let contacts = []
let users = []
let currentUser
let initials = []


async function init() {
  await downloadFromServer();
  users = await JSON.parse(backend.getItem('users')) || [];
  tasks = await JSON.parse(backend.getItem('tasks')) || [];
  contacts = await JSON.parse(backend.getItem('contacts')) || [];
  console.log(users)
  console.log(tasks)
  console.log(contacts)
  initIndex()
}

async function initIndex() {
  includeHTML();
  await getCurrentUser();

}


async function addUser() {
  let name = document.getElementById('registerName')
  let email = document.getElementById('registerEmail');
  let password = document.getElementById('registerPassword')
  users.push({ name: name.value, email: email.value, password: password.value });
  await setServer();
  window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}


async function setServer() {
  let tasksAsText = JSON.stringify(tasks);
  let contactsAsText = JSON.stringify(contacts);
  let usersAsText = JSON.stringify(users)
  console.log(tasksAsText)
  await backend.setItem('tasks', tasksAsText)
  await backend.setItem('contacts', contactsAsText)
  await backend.setItem('users', usersAsText)
}




// zeige das ausgewählte Content auf index.html
function showContent(x) {
  var content = document.querySelectorAll(".indexContent");
  content.forEach(function (element) {
    element.classList.add("d-none");
  });
  document.getElementById(x).classList.remove('d-none')

}

// zeige welcher Content aktuell ausgewählt ist
function setActiveElement(element) {
  var icon = document.querySelector(".desktopTemplateIconActive");
  icon.classList.remove("desktopTemplateIconActive");

  document.getElementById('legalNotice').classList.remove('desktopTemplateIconActive')
  element.classList.add("desktopTemplateIconActive");
  setActiveIcon(element)
}

function setActiveIcon() {
  var icons = document.getElementsByClassName("desktopTemplateMenuElements");
  for (var i = 0; i < icons.length; i++) {
    var img = icons[i].querySelector("img");
    img.src = img.src.replace("_active.svg", ".svg");
  }
  var icon = document.querySelector(".desktopTemplateIconActive");
  var img = icon.querySelector("img");
  img.src = img.src.replace(".svg", "_active.svg");
}

// ändere img bei hover auf buttons
function hover(element, url) {
  element.setAttribute('src', url);
}

function unhover(element, url) {
  element.setAttribute('src', url);
}

async function getCurrentUser() {
  var params = new URLSearchParams(window.location.search);
  currentUser = params.get('variable');

}

function closeOverlay() {
  document.getElementById('container-opened-task').classList.add('d-none');
  document.getElementById('add-task-window').classList.add('d-none');
  document.getElementById('addContactOverlay').classList.add('d-none')
}

function render() {
  renderSummary()
  renderBoard()
  renderContacts()
}

function renderSummary() {

}

function renderBoard() {

}



function renderContacts() {
  getFirstLetter()
  showContacts()
}


function getFirstLetter() {
  contacts.forEach(function (contact) {
    const initial = contact.name.charAt(0);
    if (!initials.includes(initial)) {
      initials.push(initial);
    }
  });
  initials.sort();
}
function showContacts() {
  let contactList = document.getElementById('contactsList')
  contactList.innerHTML = ''
  for (let i = 0; i < initials.length; i++) {
    const initial = initials[i];
    contactList.innerHTML += `
      <div class="contactListSection" id="contactListSection">
        <span>${initial}</span>
      </div>
      <div class="contactListSeperator">
        <img src="./assets/img/contactSeperator.svg" alt="">
      </div>`;

    // Call the 'Test()' function with 'initial' as an argument here
    Test(initial);
  }
}
function Test(initial) {
  let contactList = document.getElementById('contactsList')
  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j];
    if (contact.name.charAt(0) == initial) {
      contactList.innerHTML += `
        <div class="contactListElement">
        <div class="contantsAvatar"><span>AM</span></div>
        <div class="contactsInfo"><span>${contact.name}</span><span>${contact.email}</span></div>
    </div>`
    }
  }
}