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