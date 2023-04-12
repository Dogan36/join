
let visibleIcon = 'assets/img/visibleIcon.svg';
let notVisibleIcon = 'assets/img/notVisibleIcon.svg';
let standartIcon = 'assets/img/loginPassword.svg';
let user


document.addEventListener('DOMContentLoaded', function () {
    let logo = document.querySelector('.logo');
    let contentContainer = document.querySelector('.loginContainer');
    logo.addEventListener('animationend', () => {
        contentContainer.classList.add('show');

    });
    updateCheckbox();
    listenerPasswordImg('login');
    listenerPasswordImg('signUp');
    loadRememberedData();
    changePasswortImage('login')
});


function updateCheckbox() {
    var checkbox = document.querySelector('input[type="checkbox"]');
    var pathChecked = document.getElementById('checked');
    var pathUnchecked = document.getElementById('unchecked');
    if (checkbox.checked) {
        pathChecked.style.display = 'block';
        pathUnchecked.style.display = 'none';
    } else {
        pathChecked.style.display = 'none';
        pathUnchecked.style.display = 'block';
    }
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




function getUser() {
    let email = document.getElementById('loginEmail').value;
    user = users.find(user => user.email === email);
    
}


function rememberMe() {
    const checkbox = document.getElementById('rememberMe');
    const usernameInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    if (checkbox.checked) {
        localStorage.setItem('rememberedUser', usernameInput.value);
        localStorage.setItem('rememberedPass', passwordInput.value);
    } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedPass');
        document.querySelector('.loginContainer').reset()
    }

}


function loadRememberedData() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    const rememberedPass = localStorage.getItem('rememberedPass');
    const usernameInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    if (rememberedUser && rememberedPass) {
        usernameInput.value = rememberedUser;
        passwordInput.value = rememberedPass;
        document.getElementById('rememberMe').checked = true;
    }
}


async function addUser() {
    let name = document.getElementById('signUpName')
    let email = document.getElementById('signUpEmail');
    let password = document.getElementById('signUpPassword')
    users.push({ name: name.value, email: email.value, password: password.value });
    await setServer();
    window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}


function showContentLogin(element) {
    document.querySelector('.loginContainer').classList.add('d-none')
    document.querySelector('.signUpContainer').classList.add('d-none')
    document.querySelector('.forgotPassword').classList.add('d-none')
    document.querySelector(`.${element}`).classList.remove('d-none')
}

