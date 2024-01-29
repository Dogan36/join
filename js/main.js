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
  if (window.location.pathname.includes('index.html')) {
    if (isContentLoaded) {
      render();
    } else {
      setTimeout(callRender, 100);
    }
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
  renderAddTask()
  renderUserInitials()
  setCurrentDate()
}

/**
 * This function renders all dropdowns
 */
function renderAddTask() {
  renderAddTaskCategorySelect()
  renderAddTaskCategorys()
  renderAddTaskContactsSelect()
  renderAddTaskContacts()
  if (n !== 2) {
    choosePrio('prioYellow')
  }
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
 * @param {string} x id of the content to be shown
 */
function showContent(x) {
  let content = document.querySelectorAll(".indexContent");
  content.forEach(function (element) {
    element.classList.add("d-none");
  });
  document.getElementById(x).classList.remove('d-none')
  clearTheInputFields();

}

/**
 * This function add classlist active on menuelement which is shown
 * 
 * @param {string} element id of the element which is shown
 */
function setActiveElement(element) {
  let mobileElementName = element + "Mobile";
  let icons = document.querySelectorAll(".desktopTemplateIconActive");
  icons.forEach(function (icon) {
    icon.classList.remove("desktopTemplateIconActive");
  });
  document.getElementById('legalNotice').classList.remove('desktopTemplateIconActive')
  document.getElementById('privacyPolicy').classList.remove('desktopTemplateIconActive')
  document.getElementById(`${element}`).classList.add("desktopTemplateIconActive");
  setActiveIcon()
  if (window.location.pathname.includes('index.html') && (element === 'privacyPolicy' || element === 'legalNotice')) {
    return;
  }
  document.getElementById(`${mobileElementName}`).classList.add("desktopTemplateIconActive");
}

/**
 * This function changes the Icon inside the active element for design reasons
 */
function setActiveIcon() {
  let icons = document.getElementsByClassName("desktopTemplateMenuElements");
  let iconsMobile = document.getElementsByClassName("mobileTemplateMenuElements");
  for (let i = 0; i < icons.length; i++) {
    let img = icons[i].querySelector("img");
    if (img) img.src = img.src.replace("Active.svg", ".svg");
  }
  for (let i = 0; i < iconsMobile.length; i++) {
    let img = iconsMobile[i].querySelector("img");
    if (img) img.src = img.src.replace("Active.svg", ".svg");
  }
  let iconsActive = document.querySelectorAll(".desktopTemplateIconActive");
  iconsActive.forEach(function (iconActive) {
    let img = iconActive.querySelector("img");
    if (img) img.src = img.src.replace(".svg", "Active.svg");
  });
}

/**
 * This function changes src of img on hover for design reasons
 * 
 * @param {string} element This is the id of the element which is hovered on
 * @param {string} url This is the url which is to be set on hover
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
  let params = new URLSearchParams(window.location.search);
  let currentUserURL = params.get('variable');
  if (currentUserURL) currentUser = currentUserURL
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
 *This function lets the user logout 
 */
function logOut() {
  currentUser = 'Guest'
  window.location.href = 'login.html';
}

/**
 * This function sets the welcome desk animation on responsive design and adds class after animation end
 */
function setupWelcomeDeskAnimation() {
  let welcomeDesk = document.getElementById('welcomeDesk');
  if (welcomeDesk) {
    welcomeDesk.addEventListener('animationend', function () {
      welcomeDesk.classList.add('animationDone');
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
        link.href = 'assets/img/logoInvert.svg'; // Pfad zum Logo für den Dark Mode
      } else {
        link.href = 'assets/img/logo.svg'; // Pfad zum Standard-Logo
      }
    }
  }
}


/**
 * This function directs user to board page
 */
function goToBoardPage() {
  let boardButton = document.getElementById('board');
  renderBoard()
  setTimeout(function () {
    boardButton.click();
    document.getElementById(`addTaskForm${n}`).reset()
    deleteAddTaskFields();
    uncheckSelectedContacts();
    closeOverlay()
    closeConfirmation()
  }, 1000);
}
