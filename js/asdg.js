function closeSelectContactEmail(n) {
    document.getElementById(`new-subtask-container${n}`).classList.add('d-none');
    document.getElementById(`add-new-subtask-container${n}`).classList.remove('d-none');
  }
  
  function deleteSelectedContacts() {
    selectedContacts = []
  }

 
  
  function openSelectContactsToAssign(n) {
    deleteAddTaskContacts()
    document.getElementById(`select-contacts-container${n}`).innerHTML = ``;
    document.getElementById(`select-contacts-container${n}`).innerHTML = `
    <div onclick="closeSelectContactsToAssign(${n}); checkMandatoryFieldAssignedTo(${n})" class="contactsOption display-flex">
      <div>Select contacts to assign</div>
      <img class="arrow-icon" src="assets/img/arrow_top_icon.svg" alt="">
    </div>
      <div id="invite-new-contact-container${n}" onclick="inviteNewContact(${n})"" class="contactsOption">
        <div>Invite new contact</div>                       
      <img class="contact-icon" src="assets/img/contact_icon.svg" alt="">
    </div>`;
    loadContactsInAddTaskContacts()
    loadNewContactsInAddTaskContacts()
    renderAddTaskContacts(n)
  }
  
  
  
  
  
  function getSelectedOptionsContacts(n) {
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
  
  function checkboxChecked(n) {
    for (let i = 0; i < (selectedContacts.length); i++) {
      let contactName = selectedContacts[i]['name']
      if (selectedContacts[i]['name'].includes(contactName) === true) {
        document.getElementById(`${selectedContacts[i]['name'] + n}`).checked = true;
      }
    }
  }
  
  
  
  async function renderAddTaskContacts(n) {
  
    
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
    addTaskContacts=''
  }
  
  function loadNewContactsInAddTaskContacts() {
    for (let i = 0; i < addTaskNewContacts.length; i++) {
      // const element = addTaskNewContacts[i]  
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
  
  