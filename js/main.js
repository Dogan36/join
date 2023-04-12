setURL('https://gruppenarbeit-485join.developerakademie.net/join/smallest_backend_ever')
let tasks = []
let contacts = []
let users = []
let categorys = []
let currentUser
let initials = []
const avatarBackgroundColors = ['#FF6633', '#FF33FF',
  '#E6B333', '#3366E6', '#B34D4D',
  '#80B300', '#809900', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const categoryColors = ['#0072B2', '#E69F00', '#009E73', '#F0E442', '#CC79A7', '#56B4E9', '#D55E00', '#5D5D5D', '#CC6633', '#66CCEE', '#B2B2B2', '#999933'];



async function init(include = false) {
  await downloadFromServer();
  users = await JSON.parse(backend.getItem('users')) || [];
  tasks = await JSON.parse(backend.getItem('tasks')) || [];
  contacts = await JSON.parse(backend.getItem('contacts')) || [];
  categorys = await JSON.parse(backend.getItem('categorys')) || [];
  if (include) {
    includeHTML()
  }
}


function render() {
  renderSummary()
  greetingAds()
  renderBoard()
  renderContacts()
}


async function setServer() {
  let tasksAsText = JSON.stringify(tasks);
  let contactsAsText = JSON.stringify(contacts);
  let usersAsText = JSON.stringify(users)
  let categorysAsText = JSON.stringify(categorys)
  console.log(tasksAsText)
  await backend.setItem('tasks', tasksAsText)
  await backend.setItem('contacts', contactsAsText)
  await backend.setItem('users', usersAsText)
  await backend.setItem('categorys', categorysAsText);
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


function getCurrentUser() {
  var params = new URLSearchParams(window.location.search);
  currentUser = params.get('variable');

}


function closeOverlay() {
  const container = document.getElementById('container-opened-task');
  container.classList.add('d-none');
  document.getElementById('add-task-window').classList.add('d-none');
  document.getElementById('addContactOverlay').classList.add('d-none')
}

async function addContact() {
  let name = document.getElementById('addContactName')
  let email = document.getElementById('addContactEmail');
  let phone = document.getElementById('addContactPhone')
  contacts.push({ name: name.value, email: email.value, phone: phone.value });
  await setServer();
  document.getElementById('contactOverlay').reset()
}

function checkInputs(element) {
  document.querySelectorAll(`.${element}ErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
  if (element == 'signUp' || element == 'addContact' || element == 'changeContact') {
    checkInputNotEmpty(`${element}Name`)
  }
  checkEmail(element)
}


function checkEmail(element) {
  if (element === 'reset') {
    checkPassword(element);
    return
  }
  const email = `${element}Email`;
  if (!checkInputNotEmpty(email) && !checkEmailFormat(email)) {
    if (element === 'addContact' || element === 'changeContact') {
      addContact();
    } else if (!checkEmailExists(email)) {
      if (element === 'forgot') {
        sendNewPasswordLink();
      }
    }
  }



  function checkPassword(element) {
    const password = document.getElementById(`${element}Password`).value;
    if (checkInputNotEmpty(`${element}Password`)) {
      if (element == 'reset') {
        checkPassword('resetConfirm')
      }
      return
    }
    if (checkPasswordLength(`${element}Password`)) return;
    if (element == 'reset') {
      checkSecondPassword()
      return
    }
    if (element == 'signUp') {
      addUser();
      return;
    }
    if (element === 'login') {
      if (checkIncorrectPassword(element)) return;
      checkIn();
    }
  }
}

function checkInputNotEmpty(element) {
  const input = document.getElementById(`${element}`);
  if (input.value === '') {
    document.getElementById(`${element}Error`).classList.remove('d-none');
    return true
  }
}


function checkEmailFormat(element) {
  const input = document.getElementById(`${element}`);
  if (input.value.indexOf('@') === -1) {
    document.getElementById(`${element}FormatError`).classList.remove('d-none');
    return true
  }
}


function checkEmailExists(element) {
  const input = document.getElementById(`${element}`);
  let emailFound = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === input.value) {
      emailFound = true;
      if (element === 'signUpEmail') {
        document.getElementById(`${element}InUseError`).classList.remove('d-none');
        return true;
      }
    }
  }
  if (!emailFound && element !== 'signUpEmail') {
    document.getElementById(`${element}InUseError`).classList.remove('d-none');
    return true;
  }
  return false;
}


function checkPasswordLength(element) {
  let password = document.getElementById(`${element}`)
  if (password.value.length < 6) {
    document.getElementById(`${element}LengthError`).classList.remove('d-none');
    return true
  }
}

function checkIn() {
  rememberMe()
  let currentUser = user.name
  window.location.href = 'index.html?variable=' + currentUser;
}

function checkIncorrectPassword(element) {
  getUser();
  const password = user.password;
  if (password !== document.getElementById(`${element}Password`).value) {
    document.getElementById(`${element}PasswordIncorrectError`).classList.remove('d-none');
    console.log('falsch')
    return true
  }
  console.log('richtig')
  return false
}

function checkSecondPassword() {
  const password = document.getElementById('resetPassword').value
  const confirmPassword = document.getElementById('resetConfirmPassword').value;
  if (password !== confirmPassword) {
    document.getElementById('secondPasswordIncorrectError').classList.remove('d-none');
  } else {
    updatePassword()
  }
}

async function updatePassword() {
  var params = new URLSearchParams(window.location.search);
  email = params.get('email');
  user = users.find(user => user.email === email);
  newPassword = document.getElementById('resetPassword').value
  user.password = newPassword;
  await setServer()
  showConfirmation('forgot')
  setTimeout(function () {
    window.location.href = "login.html";
  }, 2000);
}

function showConfirmation(element) {
  const blackLayer = document.querySelector(`.${element}BlackLayer`)
  const confirmationElement = document.querySelector(`.${element}SentConfirmation`);
  confirmationElement.style.bottom = '-10%'
  blackLayer.classList.remove('d-none');
  setTimeout(() => { // wait 100ms (adjust as needed)
    confirmationElement.style.bottom = '50%'; // animate to top position
  }, 100);

setTimeout(() => {
  blackLayer.classList.add('d-none');
}, 1200);
}


