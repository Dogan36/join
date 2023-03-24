setURL('https://gruppenarbeit-485join.developerakademie.net/join/smallest_backend_ever')
let user

async function init() {
  loadServer();
  loadLocalStorage();
}

function setServer(){
  let tasksAsText = JSON.stringify(tasks);
  console.log(tasksAsText)
    let contactsTitelsAsText = JSON.stringify(contacts);
  
  backend.setItem('tasks', tasksAsText)
  console.log('testtest')
}

async function loadServer() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem('tasks')) || [];
  console.log(tasks)
 
}
//how to change img on hover?



function showContent(x) {
  var content = document.querySelectorAll(".indexContent");
  content.forEach(function (element) {
    element.classList.add("d-none");
  });
  document.getElementById(x).classList.remove('d-none')
}

function setActiveElement(element) {
  var icon = document.querySelector(".desktopTemplateIconActive");
    icon.classList.remove("desktopTemplateIconActive");
  
  document.getElementById('legalNotice').classList.remove('desktopTemplateIconActive')
  element.classList.add("desktopTemplateIconActive");
  setActiveIcon(element)
}

function setActiveIcon(){
  var icons = document.getElementsByClassName("desktopTemplateMenuElements");
  for (var i = 0; i < icons.length; i++) {
    var img = icons[i].querySelector("img");
    img.src = img.src.replace("_active.svg", ".svg");
  }
  var icon = document.querySelector(".desktopTemplateIconActive");
  var img= icon.querySelector("img");
  img.src = img.src.replace(".svg", "_active.svg");
}

function hover(element, url) {
  element.setAttribute('src', url);
}

function unhover(element, url) {
  element.setAttribute('src', url);
}