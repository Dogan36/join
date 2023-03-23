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

async function loadLocalStorage(){
 let loggedIn = localStorage.getItem('loggedIn')
redrictToPage(loggedIn)
}

function redrictToPage(loggedIn){
    if (loggedIn == true) {
        window.location.href = summary.html
    } else {
        window.location.href = login.html
    }
}

function showContent(x){
    document.getElementById('summaryContent').classList.add('d-none')
    document.getElementById('boardContent').classList.add('d-none')
    document.getElementById('addTaskContent').classList.add('d-none')
    document.getElementById('contactsContent').classList.add('d-none')
    document.getElementById(x).classList.remove('d-none')
 
}