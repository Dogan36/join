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
      const initials = getInitials(j);
      const backgroundColor = contact.id
      if (contact.name.charAt(0) == initial) {
        contactList.innerHTML += `
          <div class="contactListElement">
          <div class="contantsAvatar" style="background-color: ${avatarBackgroundColors[backgroundColor]}"><span>${initials}</span></div>
          <div class="contactsInfo"><span>${contact.name}</span><span>${contact.email}</span></div>
      </div>`
      }
    }
  }


  function getInitials(j){
    const contact = contacts[j];
    // Split the name into separate words
    const nameWords = contact.name.split(" ");
    // If there is only one word, return the first letter
    if (nameWords.length === 1) {
      return nameWords[0].charAt(0).toUpperCase();
    }
    // Otherwise, return the first letter of each word
    return nameWords.reduce((result, word) => result + word.charAt(0), '').toUpperCase();
  }
  
  
function openNewContactOverlay(){
  document.getElementById('addContactOverlay').classList.remove('d-none')
  document.getElementById('container-opened-task').classList.remove('d-none')
}