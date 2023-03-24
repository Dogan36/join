setURL('https://gruppenarbeit-485join.developerakademie.net/join/smallest_backend_ever')
let user
let users = []
async function init() {
  loadServer();
  loadLocalStorage();
}


async function loadServer() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}

async function loadLocalStorage() {
  let loggedIn = localStorage.getItem('loggedIn')
  redrictToPage(loggedIn)
}

function redrictToPage(loggedIn) {
  if (loggedIn == true) {
    window.location.href = summary.html
  } else {
    window.location.href = login.html
  }
}

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