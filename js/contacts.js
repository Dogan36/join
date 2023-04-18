let contactToEdit
function renderContacts() {
  getFirstLetter()
  showList()
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

function showList() {
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
    showContacts(initial);
  }
}


function showContacts(initial) {
  let contactList = document.getElementById('contactsList')
  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j];
    const backgroundColor = j
    if (contact.name.charAt(0) == initial) {
      contactList.innerHTML += `
          <div class="contactListElement" id='contact${j}' onclick="setActiveContact(${j})">
          <div class="contantsAvatar" style="background-color: ${avatarBackgroundColors[backgroundColor]}"><span>${contact.initials}</span></div>
          <div class="contactsInfo"><span>${contact.name}</span><span>${contact.email}</span></div>
      </div>`
    }
  }
}


function openNewContactOverlay() {
  document.getElementById('addContactOverlay').classList.remove('d-none')
  document.getElementById('container-opened-task').classList.remove('d-none')
}

function closeNewContactOverlay(){
  document.getElementById('addContactOverlay').classList.add('d-none')
  document.getElementById('container-opened-task').classList.add('d-none')
}


function openEditContactOverlay(j) {
  contactToEdit = j
  setEditContactOverlay(j)
  document.getElementById('editContactOverlay').classList.remove('d-none')
  document.getElementById('container-opened-task').classList.remove('d-none')
}


function closeEditContactOverlay(){
  document.getElementById('editContactOverlay').classList.add('d-none')
  document.getElementById('container-opened-task').classList.add('d-none')
}

function setEditContactOverlay(j) {
  let contact = contacts[j]
  document.getElementById('editContactName').value = contact.name
  document.getElementById('editContactEmail').value = contact.email
  document.getElementById('editContactPhone').value = contact.phone
  document.getElementById('editContactAvartarInitials').innerHTML = contact.initials
  document.getElementById('editContactAvartar').style = `background-color: ${avatarBackgroundColors[j]};`
  document.getElementById('editContactOverlay').addEventListener('submit', function() {
    checkInputsEditContact(j); return false;
  });
}

function setActiveContact(j) {
  var contact = document.querySelector(".contactListElementActive");
  var element = document.getElementById(`contact${j}`)
  contactCard = document.querySelector(".contactsCard")

  if (contact === element) {
    // Clicked element is already active, so remove the classes to make it inactive:
    contact.classList.remove("contactListElementActive");
    contactCard.classList.remove("contactsCardActive");

  } else {
    // Clicked element is not active, so make it active by adding classes and removing them from the previous active element:
    if (contact) {
      contact.classList.remove("contactListElementActive");
      contactCard.classList.remove("contactsCardActive");
    }

    element.classList.add("contactListElementActive");
    contactCard.classList.add("contactsCardActive");
    setInnerContactCard(j)
  }
}


function setInnerContactCard(j) {

  let contactCard = document.querySelector('.contactsCard')
  contactCard.innerHTML = ''
  contactCard.innerHTML += setInnerContactCardTemplate(j)

}

function setInnerContactCardTemplate(j) {
  let contact = contacts[j]
  return `<div class="contactCardHeader">
  <div class="contactCardAvatar" style="background-color: ${avatarBackgroundColors[j]};"><span>${contact.initials}</span></div>
  <div class="contactCardContentHeader">
      <span>${contact.name}</span>
      <div onclick="popUpWindowaddTask()"class="contactCardHeaderAddTask">
          <img src="./assets/img/contactPlus.svg" alt="">
          <span>Add Task</span>
      </div>
  </div>
</div>
<div class="contactCardInfoHeader">
  <span>Contact Information</span>
  <div onclick="openEditContactOverlay(${j})" class="contactCardEdit">
      <img src="./assets/img/editIcon.svg" alt="">
      <span>Edit Contact</span>
  </div>
</div>
<div class="contactCardInfo">
  <div class="contactCardEmail">
      <span>Email</span>
      <a href="mailto:${contact.email}">${contact.email}</a>
  </div>
  <div class="contactCardPhone">
      <span>Phone</span>
      <a href="tel:${contact.phone}">${contact.phone}</a>
  </div>
</div>`
}


async function addContact() {
  let name = document.getElementById('addContactName')
  let email = document.getElementById('addContactEmail');
  let phone = document.getElementById('addContactPhone')
  let initials = getInitials('addContactName');
  contacts.push({ name: name.value, email: email.value, phone: phone.value, initials: initials });
  await setServer();
  document.getElementById('contactOverlay').reset()
  closeNewContactOverlay()
  renderContacts()
  setActiveContact(contacts.length-1);
}

async function editContact() {
  let name = document.getElementById('editContactName')
  let email = document.getElementById('editContactEmail');
  let phone = document.getElementById('editContactPhone')
  let initials = getInitials('editContactName');
  contacts.splice(contactToEdit, 1, { name: name.value, email: email.value, phone: phone.value, initials: initials });
  await setServer();
  closeEditContactOverlay()
  renderContacts()
  setActiveContact(contactToEdit)
}


function checkInputsAddContact() {
  document.querySelectorAll(`.resetErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
  let errorCount = 0;
  errorCount += checkInputEmpty('addContactName') ? 1 : 0;
  errorCount += checkInputEmpty('addContactEmail') ? 1 : 0;
  errorCount += checkEmailFormat('addContactEmail') ? 1 : 0;
  if (errorCount > 0) return;
  document.querySelectorAll(`.resetErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
  addContact()
}

function checkInputsEditContact(j) {
  document.querySelectorAll(`.resetErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
  let errorCount = 0;
  errorCount += checkInputEmpty('editContactName') ? 1 : 0;
  errorCount += checkInputEmpty('editContactEmail') ? 1 : 0;
  errorCount += checkEmailFormat('editContactEmail') ? 1 : 0;
  if (errorCount > 0) return;
  document.querySelectorAll(`.resetErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
  editContact(j)
}