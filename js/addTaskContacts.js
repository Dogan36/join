
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
   * This funtion checks the checkboxes of contacts and adds them to selectedContacts
   */
  function selectContactToAssign() {
    selectedContacts = [];
    let checkboxes = document.getElementsByName(`option[]${n}`);
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
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
      </div>`
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
   * This function clears invite new contact input
   */
  function clearInviteNewContactValue() {
    document.getElementById(`inviteNewContact${n}`).value = ''
  }