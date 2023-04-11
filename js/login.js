
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


function checkInputs(element) {
    document.querySelectorAll(`.${element}ErrorMessage`).forEach(function (el) {
        el.classList.add('d-none');
    })
    if (element == 'signUp') {
        checkInputNotEmpty('signUpName')
    }
    checkEmail(element)
}


function checkEmail(element) {
    if (checkInputNotEmpty(`${element}Email`)) {
        return
    }
    if (checkEmailFormat(`${element}Email`)) {
        return
    }
    if (checkEmailExists(`${element}Email`)) {
        return
    }
    if (element == 'forgot'){
        sendNewPasswordLink()
        return
    }
    checkPassword(`${element}`)
}


function checkPassword(element) {
    const password = document.getElementById(`${element}Password`).value;
    if (checkInputNotEmpty(`${element}Password`)) {
        return
    }
    if (checkPasswordLength(`${element}Password`)) {
        return
    }
    if (element == 'signUp') {
        addUser()
    }
    if (element === 'login') {
        if (checkIncorrectPassword(element)) {
            return
        } else {
            rememberMe()
            let currentUser = user.name
            window.location.href = 'index.html?variable=' + currentUser;
        }
    }
}


function checkInputNotEmpty(element) {
    const input = document.getElementById(`${element}`);
    if (input.value === '') {
        document.getElementById(`${element}Error`).classList.remove('d-none');
        return true
    }
}


function checkEmailFormat(element) {
    const input = document.getElementById(`${element}`);
    if (input.value.indexOf('@') === -1) {
        document.getElementById(`${element}FormatError`).classList.remove('d-none');
        return true
    }
}


function checkEmailExists(element) {
    const input = document.getElementById(`${element}`);
    let emailFound = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === input.value) {
            emailFound = true;
            if (element === 'signUpEmail') {
                document.getElementById(`${element}InUseError`).classList.remove('d-none');
                return true;
            }
        }
    }
    if (!emailFound && element !== 'signUpEmail') {
        document.getElementById(`${element}InUseError`).classList.remove('d-none');
        return true;
    }
    return false;
}


function checkPasswordLength(element) {
    let password = document.getElementById(`${element}`)
    if (password.value.length < 6) {
        document.getElementById(`${element}LengthError`).classList.remove('d-none');
        return true
    }
}


function checkIncorrectPassword(element) {
    getUser();
    const password = user.password;
    if (password !== document.getElementById(`${element}Password`).value) {
        document.getElementById(`${element}PasswordIncorrectError`).classList.remove('d-none');
        console.log('falsch')
        return true
    }
    console.log('richtig')
    return false
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

function sendNewPasswordLink(){
    console.log('test')
}
