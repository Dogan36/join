
let tasks = [];
let contacts = [];
let users = [];
let categorys = [];
let addTaskContacts = [];
let currentUser = 'Guest'
let initials = [];
let isContentLoaded = false
let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

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


/**
 * This function calls functions to load from server and includes htmls
 *      
 * @param {boolean} include Depending on this include HTML is called or not
*/

async function init(include = false) {
  await loadUsers()
  await loadTasks()
  await loadContacts()
  await loadCategorys()
  if (include) {
    includeHTML()
  }
}

/**
 * This function loads user data from server
*/
async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * This function loads tasks data from server
*/
async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem('tasks'));
  } catch (e) {
    console.error('Loading error:', ErrorTasks);
  }
}

/**
 * This function loads contacts data from server
*/
async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.error('Loading error:', ErrorContacts);
  }
}

setFavicon(isDarkMode);
document.addEventListener('DOMContentLoaded', setupWelcomeDeskAnimation);

/**
 * This function loads category data from server
*/
async function loadCategorys() {
  try {
    categorys = JSON.parse(await getItem('categorys'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * This function calls render function aber content is loaded
 */
function callRender() {
  if (isContentLoaded) {
    render();
  } else {
    setTimeout(callRender, 100); // Warten und erneut versuchen
  }
}

callRender()


/**
 * This function renders all html
 */
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

/**
 * This function renders all dropdowns
 */
function renderAddTaskDropdowns() {
  renderAddTaskCategorySelect()
  renderAddTaskCategorys()
  renderAddTaskContactsSelect()
  renderAddTaskContacts()
}

/**
 * This function renders initals of current user
 */
function renderUserInitials() {
  let nameWords = currentUser.split(" ");
  if (nameWords.length === 1) {
    let initialsCurrentUser = nameWords[0].charAt(0).toUpperCase();
  }
  let initialsCurrentUser = nameWords.reduce((result, word) => result + word.charAt(0), '').toUpperCase();
  document.querySelector('.headerUserProfilInitials').innerHTML = initialsCurrentUser
}

/**
 * This function shows the selected content and hides all other
 * 
 * @param {sting} x id of the content to be shown
 */
function showContent(x) {
  var content = document.querySelectorAll(".indexContent");
  clearTheInputFields();
  content.forEach(function (element) {
    element.classList.add("d-none");
  });
  document.getElementById(x).classList.remove('d-none')

}
/**
 * This function add classlist active on menuelement which is shown
 * 
 * @param {string} element id of the element which is shown
 */
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

/**
 * This function changes the Icon inside the active element for design reasons
 */
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
/**
 * This function changes src of img on hover for design reasons
 * 
 * @param {string} element This is the id of the element which is hovered on
 * @param {sting} url This is the url which is to be set on hover
 */
function hover(element, url) {
  document.getElementById(`${element}`).setAttribute('src', url);
}

/**
 * This function changes src of img on hover for design reasons
 * 
 * @param {string} element This is "this" of the element which is hovered on
 * @param {sting} url This is the url which is to be set on hover
 */
function hoverThis(element, url) {
  element.setAttribute('src', url);
}

/**
 * This function gets the current user from the url
 */
function getCurrentUser() {
  var params = new URLSearchParams(window.location.search);
  let currentUserURL = params.get('variable');
  if (currentUserURL) currentUser = currentUserURL
}

/**
 * This function sets an eventlistener for the password images on input an click
 * 
 * @param {sting} element This is the ID of the element which will get an eventlistener
 */

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

/**
 * This function changes the src of an password img
 * 
 * @param {string} element This is the ID of the element to be changed
 */
function changePasswortImage(element) {
  let passwordInput = document.getElementById(`${element}Password`);
  let passwordToggle = document.getElementById(`${element}PasswordImg`);
  if (passwordInput.value === '') passwordToggle.src = standartIcon;
 else if (passwordInput.type == 'text') passwordToggle.src = visibleIcon;
  else  passwordToggle.src = notVisibleIcon
}

/**
 * This function changes the visibility of an password 
 * 
 * @param {string} element This is the ID of the element to be changed
 */
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

/**
 * This function checks all inputs on login page and let user check in if no errors
 * 
 * @returns boolean
 */
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

/**
 * This function checks all inputs on sign up page and adds user if no error
 * 
 * @returns boolean
 */
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

/**
 * This function checks all inputs on forgot password page and sends new password link if no errors
 * 
 * @returns boolean
 */

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

/**
 * This function checks all inputs on reset password page and updates password if no errors
 * 
 * @returns boolean
 */
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

/**
 * This function checks if an input is empty and shows error
 * 
 * @param {string} element ID of the element to be checked
 * @returns boolean
 */
function checkInputEmpty(element) {
  let input = document.getElementById(`${element}`);
  if (input.value === '') {
    document.getElementById(`${element}Error`).classList.remove('d-none');
    return true
  }
}

/**
 * This function checks if an input contains an "@" otherwise shows error
 * 
 * @param {string} element ID of the element to be checked
 * @returns boolean
 */
function checkEmailFormat(element) {
  let input = document.getElementById(`${element}`);
  if (input.value.indexOf('@') === -1 && input.value.length > 0) {
    document.getElementById(`${element}FormatError`).classList.remove('d-none');
    return true
  }
}
/**
 * This function checks if an email already exists in data otherwise shows error
 * 
 * @param {string} element ID of the element to be checked
 * @returns boolean
 */
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
/**
 * This function checks if an email doesn`t exists in data otherwise shows error
 * 
 * @param {string} element ID of the element to be checked
 * @returns boolean
 */
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
/**
 * This function checks if an input has the minimum count of characters otherwise shows error
 * 
 * @param {string} element ID of element to be checked
 * @returns boolean
 */
function checkPasswordLength(element) {
  let password = document.getElementById(`${element}`)
  if (password.value.length < 6 && password.value.length > 0) {
    document.getElementById(`${element}LengthError`).classList.remove('d-none');
    return true
  }
}
/**
 * This function checks if the password and confirmation password are identical otherwise shows error
 * 
 * @returns boolean
 */
function checkPasswordConfirm() {
  let password = document.getElementById('signUpPassword')
  let passwordConfirm = document.getElementById('confirmPassword')
  if (password.value != passwordConfirm.value) {
    document.getElementById('confirmPasswordConfirmIdenticalError').classList.remove('d-none');
    return true
  }
}
/**
 * This function checks if the password is incorrect and shows error
 * 
 * @param {sting} element ID of the element where password is inserted
 * @returns boolean
 */
function checkIncorrectPassword(element) {
  if (getUser()) {
    let password = document.getElementById(`${element}`).value;
    if (user.password !== password && password.length >= 6) {
      document.getElementById(`${element}IncorrectError`).classList.remove('d-none');
      return true
    } else return false
  }
}
/**
 * This functions checks if the privacy policy is checked otherwise shows error
 * 
 * @returns boolean
 */
function checkPrivacyChecked() {
  let checkbox = document.getElementById('confirmationTerms');
  if (checkbox.checked != true) {
    document.getElementById('signUpPrivacyError').classList.remove('d-none')
    return true
  } else return false
  
}

/**
 * This function lets the user check in
 */
function checkIn() {
  rememberMe()
  let currentUser = user.name
  window.location.href = 'index.html?variable=' + currentUser;
}


/**
 * This function sends an link to the user via e-mail to reset the password
 */
function sendNewPasswordLink() {
  let email = document.getElementById('forgotEmail').value
  let xhr = new XMLHttpRequest();

  let url = '//dogan-celik.developerakademie.net/join/send_mail.php';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Email sent!');
    }
  };

  let message = `Hello,\n\nPlease click on the following link to reset your password: http://dogan-celik.developerakademie.net/join/forgot.html?email=${email}\n\nBest regards,\nYour Join Team`;
  let params = `name=Join&mail=noreply@join.com&message=${message}`;
  xhr.send(params);
  showConfirmation('newPassword')
}

/**
 *This function checks of password and confirm passwort are identical on reset page
 */
function checkPasswordMatch() {
  let password = document.getElementById('resetPassword').value
  let confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) document.getElementById('confirmPasswordIncorrectError').classList.remove('d-none');
}

/**
 * This function updates the password of the user
 */
async function updatePassword() {
  var params = new URLSearchParams(window.location.search);
  email = params.get('email');
  user = users.find(user => user.email === email);
  newPassword = document.getElementById('resetPassword').value
  user.password = newPassword;
  await setItem('users', users)
  showConfirmation('forgot')
}

/**
 * This function shows confirmation to the user
 * 
 * @param {string} confirmation This is the type of confirmation the user gets 
 */
function showConfirmation(confirmation) {
  showDarkBackground()
  let flyInButton = document.getElementById(`fly-in-button`);
  changeflyInButton(confirmation)
  flyInButton.classList.remove('d-none');
}
/**
 * This function closes the confirmation
 */
function closeConfirmation() {
  let flyInButton = document.getElementById(`fly-in-button`);
  flyInButton.classList.add('d-none');
}

/**
 * This function gets the Initials of a contact
 * 
 * @param {string} element ID of the element to get the initials from
 * @returns string
 */
function getInitials(element) {
  let contact = document.getElementById(element)
  let nameWords = contact.value.split(" ");
  if (nameWords.length === 1) {
    return nameWords[0].charAt(0).toUpperCase();
  }
  return nameWords.reduce((result, word) => result + word.charAt(0), '').toUpperCase();
}

/**
 * This function opens the add task overlay
 * 
 * @param {string} progress Preset the progress of the task to create
 */
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
/**
 * This function opens the overlay with the active task
 * 
 * @param {number} i This is the position of the task in tasks array
 */
function openActiveTaskOverlay(i) {
  let activeTask = tasks[i];
  document.getElementById('activeTaskOverlay').innerHTML = addActiveTaskOverlayHTML(i)
  showDarkBackground()
  document.getElementById('activeTaskOverlay').classList.add('overlayActive')
}
/**
 * This function opens the edit task overlay with the active task 
 * 
 * @param {number} i This is the position of the task in tasks array
 */
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
/**
 * This function opens the new contact overlay
 */
function openNewContactOverlay() {
  showDarkBackground()
  document.getElementById('addContactOverlay').classList.add('overlayActive')
}

/**
 * This function closes the new contact overlay
 */
function closeNewContactOverlay() {
  document.getElementById('addContactOverlay').classList.add('d-none')
  document.getElementById('container-opened-task').classList.add('d-none')
}

/**
 * This function opens the edit contact overlay
 * 
 * @param {number} j This is the position of the contact in contacts array
 */
function openEditContactOverlay(j) {
  contactToEdit = j
  setEditContactOverlay(j)
  document.getElementById('editContactOverlay').classList.add('overlayActive')
  showDarkBackground()
}
/**
 * This function shows the dark background
 */
function showDarkBackground() {
  document.getElementById('darkBackgroundContainer').classList.remove('d-none');
}

/**
 * This function hides the dark background
 */
function closeDarkBackground() {
  document.getElementById('darkBackgroundContainer').classList.add('d-none');
}

/**
 * This function closes the active overlay
 */
function closeOverlay() {
  let overlay = document.querySelector('.overlayActive')
  if (overlay) overlay.classList.remove('overlayActive');
  clearTheInputFields()
  n = 0
  setTimeout(closeDarkBackground, 500)
}
/**
 * This function changes the inner html of the fly in button
 * 
 * @param {string} confirmation This is the change inside the fly in button
 */
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

/**
 * This function toogles the logout modal and closes it after timeout
 */
function toggleLogout() {
  let button = document.querySelector('.log-out-modal')
  if (button.classList.contains('d-none')) button.classList.remove('d-none')
  else button.classList.add('d-none')
  setTimeout(closeLogout, 2000)
}

/**
 * This function closes the logout modal
 */
function closeLogout() {
  let button = document.querySelector('.log-out-modal')
  if (!button.classList.contains('d-none')) button.classList.add('d-none')
}

/**
 *This function lets the user logout 
 */
function logOut() {
  window.location.href = 'login.html';
}

/**
 * This function resets all inputs and error messages on sign up
 */
function resetSignUpInputs() {
  document.querySelector('.signUpContainer').reset();
  document.querySelectorAll(`.signUpErrorMessage`).forEach(function (el) {
    el.classList.add('d-none');
  })
}

/**
 * This function sets the welcome desk animation on responsive design and adds class after animation end
 */
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

/**
 * This function sets the src of favicon depending on darkmode
 * 
 * @param {boolean} isDarkMode This tells the function if darkmode is used or not
 */
function setFavicon(isDarkMode) {
  const linkElements = document.getElementsByTagName('link');
  for (const link of linkElements) {
      if (link.rel === 'icon') {
          if (isDarkMode) {
              link.href = 'assets/img/logo_invert.svg'; // Pfad zum Logo für den Dark Mode
          } else {
              link.href = 'assets/img/logo.svg'; // Pfad zum Standard-Logo
          }
      }
  }
}
