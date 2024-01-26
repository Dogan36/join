let contactToEdit

/**
 * This function renders the contacts
 */
function renderContacts() {
  initials = []
  getFirstLetter()
  showList()
}

/**
 * This function gets the first letter of every contact and pushes them into initials if the contact is not "Contact deleted" and the letter isn´t in the array already
 */
function getFirstLetter() {
  contacts.forEach(function (contact) {
    let name = contact.name;
    let initial = name.charAt(0).toUpperCase();
    if (name !== 'Contact deleted' && !initials.includes(initial)) {
      initials.push(initial);
    }
  });
  initials.sort();
}

/**
 * This function generates html for the contact list sections
 */
function showList() {
  let contactList = document.getElementById('contactsList')
  if (initials.length > 0) {
    contactList.innerHTML = ''
    for (let i = 0; i < initials.length; i++) {
      const initial = initials[i].toUpperCase();
      contactList.innerHTML += `
        <div class="contactListSection" id="contactListSection">
          <span>${initial}</span>
        </div>
        <div class="contactListSeperator">
          <img src="./assets/img/contactSeperator.svg" alt="">
        </div>`;
      showContacts(initial);
    }
  }
}

/**
 * This function renders the contacts by their first letter
 * 
 * @param {string} initial This is the initial of the contacts to be rendered
 */
function showContacts(initial) {
  let contactList = document.getElementById('contactsList')
  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j];
    const backgroundColor = j
    if (contact.name.charAt(0).toUpperCase() === initial && contact.name !== 'Contact deleted')
    {
      contactList.innerHTML += `
          <div class="contactListElement" id='contact${j}' onclick="setActiveContact(${j})">
          <div class="contantsAvatar" style="background-color: ${avatarBackgroundColors[backgroundColor]}"><span>${contact.initials.toUpperCase()}</span></div>
          <div class="contactsInfo"><span>${contact.name}</span><span>${contact.email}</span></div>
      </div>`
    }
  }
}

/**
 * This function sets the edit contact overlay 
 * 
 * @param {number} j This is the index of the contact
 */
function setEditContactOverlay(j) {
  let contact = contacts[j]
  document.getElementById('editContactName').value = contact.name
  document.getElementById('editContactEmail').value = contact.email
  document.getElementById('editContactPhone').value = contact.phone
  document.getElementById('editContactAvartarInitials').innerHTML = contact.initials
  document.getElementById('editContactAvartar').style = `background-color: ${avatarBackgroundColors[j]};`
  document.getElementById('editContactOverlay').addEventListener('submit', function () {
    checkInputsEditContact(j); return false;
  });
}

/**
 * This function adds a class to the active element on the contact list
 * 
 * @param {number} j This is the index of the active contact
 */
function setActiveContact(j) {
  var contact = document.querySelector(".contactListElementActive");
  var element = document.getElementById(`contact${j}`)
  contactCard = document.querySelector(".contactsCard")
  if (contact === element) {
    contact.classList.remove("contactListElementActive");
    contactCard.classList.remove("contactsCardActive");
  } else {
    if (contact) {
      contact.classList.remove("contactListElementActive");
      contactCard.classList.remove("contactsCardActive");
    }
    element.classList.add("contactListElementActive");
    contactCard.classList.add("contactsCardActive");
    document.querySelector('.contactsRight').classList.add("contactsRightMobileActive")
    setInnerContactCard(j)
  }
}

/**
 * This function sets the inner contact card
 * 
 * @param {number} j This is the index of the contact
 */
function setInnerContactCard(j) {
  let contactCard = document.querySelector('.contactsCard')
  contactCard.innerHTML = ''
  contactCard.innerHTML += setInnerContactCardTemplate(j)
}

/**
 * This function generates the html for the inner contact card
 * 
 * @param {number} j This is the index of the active contact
 * @returns string
 */
function setInnerContactCardTemplate(j) {
  let contact = contacts[j]
  return `<div class="contactCardHeader">
  <div class="contactCardAvatar" style="background-color: ${avatarBackgroundColors[j]};"><span>${contact.initials}</span></div>
  <div class="contactCardContentHeader">
      <span>${contact.name}</span>
      <div class="contactCardEdits">
      <div onclick="openEditContactOverlay(${j})" class="contactCardEdit">
      <img src="./assets/img/editIcon.svg" alt="">
      <span>Edit</span>
      </div>
      <div onclick="deleteContact(${j})" class="contactCardEdit">
      <img src="./assets/img/delete.svg" alt="">
      <span>Delete</span>
      </div>
  </div>
  </div>
</div>
<div class="contactCardInfoHeader">
  <span>Contact Information</span>
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

/**
 * This function adds the contact to contacts
 */
async function addContact() {
  let name = document.getElementById('addContactName')
  let email = document.getElementById('addContactEmail');
  let phone = document.getElementById('addContactPhone')
  let initials = getInitials('addContactName');
  contacts.push({ name: name.value, email: email.value, phone: phone.value, initials: initials });
  await setItem('contacts', contacts);
  document.getElementById('contactOverlay').reset()
  closeOverlay()
  renderContacts()
  setActiveContact(contacts.length - 1);
 showConfirmation('contactAdded')
 setTimeout(closeConfirmation, 2000)
}

/**
 * This function replaces a contact with a placeholder called "contact deleted"
 * 
 * @param {number} j This is the index of the contact to be deleted
 */
async function deleteContact(j) {
  let name = 'Contact deleted'
  let email = ''
  let phone = ''
  let initials = 'CD'
  contacts.splice(j, 1, { name: name, email: email, phone: phone, initials: initials });
  await setItem('contacts', contacts);
  showConfirmation('contactDeleted')
  setTimeout(closeConfirmation, 2000)
  closeOverlay()
  document.querySelector(".contactsCard").classList.remove('contactsCardActive')
  closeContactsRightMobile()
  renderContacts()
}

/**
 * This function replaces a contact in contacts with the edited contact
 */
async function editContact() {
  let name = document.getElementById('editContactName')
  let email = document.getElementById('editContactEmail');
  let phone = document.getElementById('editContactPhone')
  let initials = getInitials('editContactName');
  contacts.splice(contactToEdit, 1, { name: name.value, email: email.value, phone: phone.value, initials: initials });
  await setItem('contacts', contacts);
  showConfirmation('contactUpdated')
  setTimeout(closeConfirmation, 2000)
  closeOverlay()
  renderContacts()
  setActiveContact(contactToEdit)
}

/**
 * This funcion checks the add contact inputs for errors and calls addcontact if there are none
 * @returns boolean
 */
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

/**
 * This funcion checks the edit contact inputs for errors and calls editcontact if there are none
 * @param {number} j This is the index of the contact to be editet
 * @returns boolean
 */
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

/**
 * This function closes the right section of contacts for responsivness
 */
function closeContactsRightMobile() {
  document.querySelector('.contactsRight').classList.remove("contactsRightMobileActive");
  let contact = document.querySelector(".contactListElementActive");
  if (contact) contact.classList.remove("contactListElementActive");
}

/**
 * This function toggles the visibility of contact card edits
 */
function toggleEdits() {
  let edits = document.querySelector(".contactCardEdits")
  if (edits.style.display == 'flex') edits.style.display = 'none'
  else  edits.style.display = 'flex' ;
}