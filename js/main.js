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






