setURL('https://gruppenarbeit-485join.developerakademie.net/join/smallest_backend_ever')

let users =[]
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}