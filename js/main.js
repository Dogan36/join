setURL('https://gruppenarbeit-485join.developerakademie.net/join/smallest_backend_ever')
let tasks = [];
let contacts = [];
let users = [];
let categorys = [];
let currentUser
let initials = [];
let addTaskNewContacts = [];
let addTaskContacts = [];
let selectedContacts = []; 

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

let visibleIcon = 'assets/img/visibleIcon.svg';
let notVisibleIcon = 'assets/img/notVisibleIcon.svg';
let standartIcon = 'assets/img/loginPassword.svg';

async function init(include = false) {
  await downloadFromServer();
  users = await JSON.parse(backend.getItem('users')) || [];
  tasks = await JSON.parse(backend.getItem('tasks')) || [];
  contacts = await JSON.parse(backend.getItem('contacts')) || [];
  categorys = await JSON.parse(backend.getItem('categorys')) || [];
  addTaskNewContacts = await JSON.parse(backend.getItem('addTaskNewContacts')) || [];
  addTaskContacts = await JSON.parse(backend.getItem('addTaskContacts')) || [];
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
  let usersAsText = JSON.stringify(users);
  let categorysAsText = JSON.stringify(categorys);
  let addTaskNewContactsText = JSON.stringify(addTaskNewContacts);
  let addTaskContactsText = JSON.stringify(addTaskContacts);
  console.log(tasksAsText);
  await backend.setItem('tasks', tasksAsText);
  await backend.setItem('contacts', contactsAsText);
  await backend.setItem('users', usersAsText);
  await backend.setItem('categorys', categorysAsText);
  await backend.setItem('addTaskNewContacts', addTaskNewContactsText);
  await backend.setItem('addTaskContacts', addTaskContactsText);
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
  document.getElementById('addContactOverlay').classList.add('d-none');
  document.getElementById('editContactOverlay').classList.add('d-none');
  document.getElementById('activeTaskOverlay').classList.add('d-none');
}


function listenerPasswordImg(element) {
  let passwordInput = document.getElementById(`${element}Password`);
  let passwordToggle = document.getElementById(`${element}PasswordImg`);
  passwordInput.addEventListener('keyup', function () {
      changePasswortImage(element);
  });
  passwordToggle.addEventListener('click', function () {
      togglePasswordVisibility(element);
  });
}

function changePasswortImage(element) {
  let passwordInput = document.getElementById(`${element}Password`);
  let passwordToggle = document.getElementById(`${element}PasswordImg`);
  if (passwordInput.value === '') {
      passwordToggle.src = standartIcon;
  } else if (passwordInput.type == 'text') {
      passwordToggle.src = visibleIcon;
  }
  else {
      passwordToggle.src = notVisibleIcon
  }
}

function togglePasswordVisibility(element) {
  let passwordInput = document.getElementById(`${element}Password`);
  let passwordToggle = document.getElementById(`${element}PasswordImg`);
  if (passwordInput.value === '') {
      passwordToggle.src = standartIcon;
  } else {
      if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          passwordToggle.src = visibleIcon;
      } else {
          passwordInput.type = 'password';
          if (passwordToggle.src !== 'assets/img/loginPassword.svg') {
              passwordToggle.src = notVisibleIcon;
          }
      }
  }
}

function checkInputsLogin() {
  document.querySelectorAll(`.loginErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
  })
  let errorCount = 0;
  errorCount += checkInputEmpty('loginEmail') ? 1 : 0;
  errorCount += checkInputEmpty('loginPassword') ? 1 : 0;
  errorCount += checkEmailFormat('loginEmail') ? 1 : 0;
  errorCount += checkEmailDoesntExist('loginEmail') ? 1 : 0;
  errorCount += checkPasswordLength('loginPassword') ? 1 : 0;
  errorCount += checkIncorrectPassword('loginPassword') ? 1 : 0;
  if (errorCount > 0) return;
  checkIn()
}


function checkInputsSignUp() {
  document.querySelectorAll(`.signUpErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
  })
  let errorCount = 0;
  errorCount += checkInputEmpty('signUpName') ? 1 : 0;
  errorCount += checkInputEmpty('signUpEmail') ? 1 : 0;
  errorCount += checkInputEmpty('signUpPassword') ? 1 : 0;
  errorCount += checkEmailFormat('signUpEmail') ? 1 : 0;
  errorCount += checkEmailExist('signUpEmail') ? 1 : 0;
  errorCount += checkPasswordLength('signUpPassword') ? 1 : 0;
  if (errorCount > 0) return;
  addUser()
}


function checkInputsForgot() {
  document.querySelectorAll(`.forgotErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
  })
  let errorCount = 0;
  errorCount += checkInputEmpty('forgotEmail') ? 1 : 0;
  errorCount += checkEmailFormat('forgotEmail') ? 1 : 0;
  errorCount += checkEmailDoesntExist('forgotEmail') ? 1 : 0;
  if (errorCount > 0) return;
  sendNewPasswordLink()
}


function checkInputsReset() {
  document.querySelectorAll(`.resetErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
  })
  let errorCount = 0;
  errorCount += checkInputEmpty('resetPassword') ? 1 : 0;
  errorCount += checkInputEmpty('confirmPassword') ? 1 : 0;
  errorCount += checkPasswordLength('resetPassword') ? 1 : 0;
  errorCount += checkPasswordMatch() ? 1 : 0;
  if (errorCount > 0) return;
  updatePassword()
}


function checkInputEmpty(element) {
  const input = document.getElementById(`${element}`);
  if (input.value === '') {
      document.getElementById(`${element}Error`).classList.remove('d-none');
      return true
  }
}


function checkEmailFormat(element) {
  const input = document.getElementById(`${element}`);
  if (input.value.indexOf('@') === -1 && input.value.length > 0) {
      document.getElementById(`${element}FormatError`).classList.remove('d-none');
      return true
  }
}


function checkEmailExist(element) {
  const input = document.getElementById(`${element}`);
  let emailFound = false;
  for (var i = 0; i < users.length; i++) {
      if (users[i].email === input.value) {
          document.getElementById(`${element}InUseError`).classList.remove('d-none');
          return true;
      }
  }
  return false
}


function checkEmailDoesntExist(element) {
  const input = document.getElementById(`${element}`);
  let emailFound = false;
  for (var i = 0; i < users.length; i++) {
      if (users[i].email === input.value) {
          if (input.value.length > 0 && input.value.includes('@'))
              return false
      }
  }
  if (input.value.length > 0 && input.value.includes('@')) document.getElementById(`${element}NotFoundError`).classList.remove('d-none');
  return true
}


function checkPasswordLength(element) {
  let password = document.getElementById(`${element}`)
  if (password.value.length < 6 && password.value.length > 0) {
      document.getElementById(`${element}LengthError`).classList.remove('d-none');
      return true
  }
}


function checkIncorrectPassword(element) {
  if (getUser()) {
      const password = document.getElementById(`${element}`).value;
      if (user.password !== password && password.length >= 6) {
          document.getElementById(`${element}IncorrectError`).classList.remove('d-none');
          return true
      } else {
          return false
      }
  }
}



function checkIn() {
  rememberMe()
  let currentUser = user.name
  window.location.href = 'index.html?variable=' + currentUser;
}


function sendNewPasswordLink() {
  let email = document.getElementById('forgotEmail').value
  const xhr = new XMLHttpRequest();
  const url = '//gruppenarbeit-485join.developerakademie.net/join/send_mail.php';

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Success!
          console.log('Email sent!');
      }
  };

  const message = `Hello,\n\nPlease click on the following link to reset your password: http://gruppenarbeit-485join.developerakademie.net/join/reset.html?email=${email}\n\nBest regards,\nYour Join Team`;
  const params = `name=Join&mail=noreply@join.com&message=${message}`;

  xhr.send(params);
  showConfirmation('login')
}

function checkPasswordMatch() {
  const password = document.getElementById('resetPassword').value
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) document.getElementById('confirmPasswordIncorrectError').classList.remove('d-none');
      
}

async function updatePassword() {
  var params = new URLSearchParams(window.location.search);
  email = params.get('email');
  user = users.find(user => user.email === email);
  newPassword = document.getElementById('resetPassword').value
  user.password = newPassword;
  await setServer()
  showConfirmation('forgot')
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
      if (element == 'forgot') {
          window.location.href = "login.html";
      } if (element == 'login') { showContentLogin('loginContainer') }
  }, 1200);

}


function sendNewPasswordLink() {
  let email = document.getElementById('forgotEmail').value
  const xhr = new XMLHttpRequest();
  const url = '//gruppenarbeit-485join.developerakademie.net/join/send_mail.php';

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Success!
      console.log('Email sent!');
    }
  };

  const message = `Hello,\n\nPlease click on the following link to reset your password: http://gruppenarbeit-485join.developerakademie.net/join/forgot.html?email=${email}\n\nBest regards,\nYour Join Team`;
  const params = `name=Join&mail=noreply@join.com&message=${message}`;

  xhr.send(params);
  showConfirmation('login')
}


function getInitials(element){
  const contact = document.getElementById(element)
  // Split the name into separate words
  const nameWords = contact.value.split(" ");
  // If there is only one word, return the first letter
  if (nameWords.length === 1) {
    return nameWords[0].charAt(0).toUpperCase();
  }
  // Otherwise, return the first letter of each word
  return nameWords.reduce((result, word) => result + word.charAt(0), '').toUpperCase();
}