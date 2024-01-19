
let tasks = [];
let contacts = [];
let users = [];
let categorys = [];
let addTaskContacts = [];
let currentUser = 'Guest'
let initials = [];
let isContentLoaded = false
let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let favicon = document.getElementById('favicon');
let avatarBackgroundColors = ['#FF6633', '#FF33FF',
  '#E6B333', '#3366E6', '#B34D4D',
  '#80B300', '#809900', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

let categoryColors = ['#0072B2', '#E69F00', '#009E73', '#F0E442', '#CC79A7', '#56B4E9', '#D55E00', '#5D5D5D', '#CC6633', '#66CCEE', '#B2B2B2', '#999933'];
let visibleIcon = 'assets/img/visibleIcon.svg';
let notVisibleIcon = 'assets/img/notVisibleIcon.svg';
let standartIcon = 'assets/img/loginPassword.svg';

async function init(include = false) {
  await loadUsers()
  await loadTasks()
  await loadContacts()
  await loadCategorys()
  if (include) {
    includeHTML()
  }
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem('tasks'));
  } catch (e) {
    console.error('Loading error:', ErrorTasks);
  }
}

async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.error('Loading error:', ErrorContacts);
  }
}

async function loadCategorys() {
  try {
    categorys = JSON.parse(await getItem('categorys'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

function callRender() {
  if (isContentLoaded) {
    render();
  } else {
    setTimeout(callRender, 100); // Warten und erneut versuchen
  }
}

callRender()

function render() {
  getCurrentUser()
  renderSummary()
  greetingAds()
  renderBoard()
  renderContacts()
  renderAddTaskDropdowns()
  renderUserInitials()
  setCurrentDate()
}

function renderAddTaskDropdowns() {
  renderAddTaskCategorySelect()
  renderAddTaskCategorys()
  renderAddTaskContactsSelect()
  renderAddTaskContacts()
}

function renderUserInitials() {
  let nameWords = currentUser.split(" ");
  if (nameWords.length === 1) {
    let initialsCurrentUser = nameWords[0].charAt(0).toUpperCase();
  }
  let initialsCurrentUser = nameWords.reduce((result, word) => result + word.charAt(0), '').toUpperCase();
  document.querySelector('.headerUserProfilInitials').innerHTML = initialsCurrentUser
}

function showContent(x) {
  var content = document.querySelectorAll(".indexContent");
  clearTheInputFields();
  content.forEach(function (element) {
    element.classList.add("d-none");
  });
  document.getElementById(x).classList.remove('d-none')

}

function setActiveElement(element) {
  var mobileElementName = element + "Mobile";
  var icons = document.querySelectorAll(".desktopTemplateIconActive");
  icons.forEach(function (icon) {
    icon.classList.remove("desktopTemplateIconActive");
  });
  document.getElementById('legalNotice').classList.remove('desktopTemplateIconActive')
  document.getElementById('privacyPolicy').classList.remove('desktopTemplateIconActive')
  document.getElementById(`${element}`).classList.add("desktopTemplateIconActive");
  if (!(element === 'privacyPolicy' || element === 'legalNotice')) {
    document.getElementById(`${mobileElementName}`).classList.add("desktopTemplateIconActive");
  }
  setActiveIcon()
}

function setActiveIcon() {
  var icons = document.getElementsByClassName("desktopTemplateMenuElements");
  var iconsMobile = document.getElementsByClassName("mobileTemplateMenuElements");
  for (var i = 0; i < 4; i++) {
    var img = icons[i].querySelector("img");
    img.src = img.src.replace("_active.svg", ".svg");
  }
  for (var i = 0; i < 4; i++) {
    var img = iconsMobile[i].querySelector("img");
    img.src = img.src.replace("_active.svg", ".svg");
  }
  var iconsActive = document.querySelectorAll(".desktopTemplateIconActive");
  iconsActive.forEach(function (iconActive) {
    var img = iconActive.querySelector("img");
    if (img) img.src = img.src.replace(".svg", "_active.svg");
  });

}

function hover(element, url) {
  document.getElementById(`${element}`).setAttribute('src', url);
}

function hoverThis(element, url) {
  element.setAttribute('src', url);
}

function getCurrentUser() {
  var params = new URLSearchParams(window.location.search);
  let currentUserURL = params.get('variable');
  if (currentUserURL) currentUser = currentUserURL
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
  if (passwordInput.value === '') passwordToggle.src = standartIcon;
 else if (passwordInput.type == 'text') passwordToggle.src = visibleIcon;
  else  passwordToggle.src = notVisibleIcon
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
      if (passwordToggle.src !== 'assets/img/loginPassword.svg') passwordToggle.src = notVisibleIcon;
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
  errorCount += checkInputEmpty('confirmPassword') ? 1 : 0;
  errorCount += checkEmailFormat('signUpEmail') ? 1 : 0;
  errorCount += checkEmailExist('signUpEmail') ? 1 : 0;
  debugger
  errorCount += checkPasswordLength('signUpPassword') ? 1 : 0;
  errorCount += checkPasswordConfirm('signUpPassword') ? 1 : 0;
  errorCount += checkPrivacyChecked() ? 1 : 0;
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
  let input = document.getElementById(`${element}`);
  if (input.value === '') {
    document.getElementById(`${element}Error`).classList.remove('d-none');
    return true
  }
}

function checkEmailFormat(element) {
  let input = document.getElementById(`${element}`);
  if (input.value.indexOf('@') === -1 && input.value.length > 0) {
    document.getElementById(`${element}FormatError`).classList.remove('d-none');
    return true
  }
}

function checkEmailExist(element) {
  let input = document.getElementById(`${element}`);
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
  let input = document.getElementById(`${element}`);
  let emailFound = false;
  for (var i = 0; i < users.length; i++) {
    if (input.value.length > 0 && input.value.includes('@') && users[i].email === input.value) 
      return false;
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

function checkPasswordConfirm() {
  let password = document.getElementById('signUpPassword')
  let passwordConfirm = document.getElementById('confirmPassword')
  if (password.value != passwordConfirm.value) {
    document.getElementById('confirmPasswordConfirmIdenticalError').classList.remove('d-none');
    return true
  }
}

function checkIncorrectPassword(element) {
  if (getUser()) {
    let password = document.getElementById(`${element}`).value;
    if (user.password !== password && password.length >= 6) {
      document.getElementById(`${element}IncorrectError`).classList.remove('d-none');
      return true
    } else return false
  }
}

function checkPrivacyChecked() {
  let checkbox = document.getElementById('confirmationTerms');
  if (checkbox.checked != true) {
    document.getElementById('signUpPrivacyError').classList.remove('d-none')
    return true
  } else return false
  
}

function checkIn() {
  rememberMe()
  let currentUser = user.name
  window.location.href = 'index.html?variable=' + currentUser;
}

function sendNewPasswordLink() {
  let email = document.getElementById('forgotEmail').value
  let xhr = new XMLHttpRequest();
  let url = '//gruppenarbeit-485join.developerakademie.net/join/send_mail.php';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  };

  let message = `Hello,\n\nPlease click on the following link to reset your password: http://gruppenarbeit-485join.developerakademie.net/join/reset.html?email=${email}\n\nBest regards,\nYour Join Team`;
  let params = `name=Join&mail=noreply@join.com&message=${message}`;
  xhr.send(params);
  showConfirmation('login')
}

function checkPasswordMatch() {
  let password = document.getElementById('resetPassword').value
  let confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) document.getElementById('confirmPasswordIncorrectError').classList.remove('d-none');
}

async function updatePassword() {
  var params = new URLSearchParams(window.location.search);
  email = params.get('email');
  user = users.find(user => user.email === email);
  newPassword = document.getElementById('resetPassword').value
  user.password = newPassword;
  await setItem('users', users)
  showConfirmation('forgot')
}

function showConfirmation(confirmation) {
  showDarkBackground()
  let flyInButton = document.getElementById(`fly-in-button`);
  changeflyInButton(confirmation)
  flyInButton.classList.remove('d-none');
}

function closeConfirmation() {
  let flyInButton = document.getElementById(`fly-in-button`);
  flyInButton.classList.add('d-none');
}

function sendNewPasswordLink() {
  let email = document.getElementById('forgotEmail').value
  let xhr = new XMLHttpRequest();
  let url = '//gruppenarbeit-485join.developerakademie.net/join/send_mail.php';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Email sent!');
    }
  };

  let message = `Hello,\n\nPlease click on the following link to reset your password: http://gruppenarbeit-485join.developerakademie.net/join/forgot.html?email=${email}\n\nBest regards,\nYour Join Team`;
  let params = `name=Join&mail=noreply@join.com&message=${message}`;
  xhr.send(params);
  showConfirmation('newPassword')
}

function getInitials(element) {
  let contact = document.getElementById(element)
  let nameWords = contact.value.split(" ");
  if (nameWords.length === 1) {
    return nameWords[0].charAt(0).toUpperCase();
  }
  return nameWords.reduce((result, word) => result + word.charAt(0), '').toUpperCase();
}

function openAddTaskOverlay(progress) {
  if (progress) taskProgress = progress
  else progress = 'toDo'
  clearTheInputFields()
  choosenCategory = undefined
  n = 1;
  renderAddTaskDropdowns()
  showDarkBackground()
  document.getElementById('addTaskOverlay').classList.add('overlayActive');
}

function openActiveTaskOverlay(i) {
  let activeTask = tasks[i];
  document.getElementById('activeTaskOverlay').innerHTML = addActiveTaskOverlayHTML(i)
  showDarkBackground()
  document.getElementById('activeTaskOverlay').classList.add('overlayActive')
}

function openEditTaskOverlay(i) {
  taskProgress = tasks[i].taskProgress
  console.log(taskProgress)
  closeOverlay()
  clearTheInputFields()
  n = 2;
  renderAddTaskDropdowns()
  setTimeout(showDarkBackground, 500)
  document.getElementById('editTaskOverlay').classList.add('overlayActive')
  setEditTaskOverlay(i)
}

function openNewContactOverlay() {
  showDarkBackground()
  document.getElementById('addContactOverlay').classList.add('overlayActive')
}

function closeNewContactOverlay() {
  document.getElementById('addContactOverlay').classList.add('d-none')
  document.getElementById('container-opened-task').classList.add('d-none')
}

function openEditContactOverlay(j) {
  contactToEdit = j
  setEditContactOverlay(j)
  document.getElementById('editContactOverlay').classList.add('overlayActive')
  showDarkBackground()
}

function showDarkBackground() {
  document.getElementById('darkBackgroundContainer').classList.remove('d-none');
}

function closeDarkBackground() {
  document.getElementById('darkBackgroundContainer').classList.add('d-none');
}

function closeOverlay() {
  let overlay = document.querySelector('.overlayActive')
  if (overlay) overlay.classList.remove('overlayActive');
  clearTheInputFields()
  n = 0
  setTimeout(closeDarkBackground, 500)
}

function changeflyInButton(confirmation) {
  let flyInButton = document.getElementById(`fly-in-button`);
  if (confirmation == 'taskAdded') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Task added to board</div>
  <img id="confirmationImg"src="./assets/img/boardIcon.svg" alt="">`}
  else if (confirmation == 'taskDeleted') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Task deleted</div>
  <img id="confirmationImg"src="./assets/img/deleteWhite.svg" alt="">`
  }
  else if (confirmation == 'taskMoved') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Task Moved</div>
  <img id="confirmationImg" src="./assets/img/moveWhite.svg" alt="">`
  }
  else if (confirmation == 'taskUpdated') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Task Updated</div>
  <img id="confirmationImg" src="./assets/img/update.svg" alt="">`
  }
  else if (confirmation == 'contactUpdated') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Contact Updated</div>
  <img id="confirmationImg" src="./assets/img/update.svg" alt="">`
  }
  else if (confirmation == 'newPassword') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">An e-mail has beend send</div>
  <img id="confirmationImg" src="./assets/img/SendCheck.svg" alt="">`
  }
  else if (confirmation == 'signedUp') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Signed up successfully</div>
  <img id="confirmationImg" src="./assets/img/userIcon.svg" alt="">`
  }
  else if (confirmation == 'contactDeleted') {
    flyInButton.innerHTML = `
  <div id="confirmationText" class="task-added-to-board">Contact deleted</div>
  <img id="confirmationImg" src="./assets/img/deleteWhite.svg" alt="">`
  }
}

function toggleLogout() {
  let button = document.querySelector('.log-out-modal')
  if (button.classList.contains('d-none')) button.classList.remove('d-none')
  else button.classList.add('d-none')
  setTimeout(closeLogout, 2000)
}

function closeLogout() {
  let button = document.querySelector('.log-out-modal')
  if (!button.classList.contains('d-none')) button.classList.add('d-none')
}

function logOut() {
  window.location.href = 'login.html';
}

function resetSignUpInputs() {
  document.querySelector('.signUpContainer').reset();
  document.querySelectorAll(`.signUpErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
}

function setupWelcomeDeskAnimation() {
  var welcomeDesk = document.getElementById('welcomeDesk');
  if (welcomeDesk) {
      welcomeDesk.addEventListener('animationend', function () {
          welcomeDesk.classList.add('animation-done');
      });
  } else {
      setTimeout(function () {
          setupWelcomeDeskAnimation();
      }, 1000);
  }
}
document.addEventListener('DOMContentLoaded', setupWelcomeDeskAnimation);

if (isDarkMode) {
    favicon.href = 'assets/img/logo_invert.svg'; // Pfad zum Logo für den Dark Mode
}