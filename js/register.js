let passwordInput;
let passwordToggle;
let visibleIcon;
let unVisibleIcon;
let standartIcon;


document.addEventListener('DOMContentLoaded', function () {
    addAllEventListener()

});

function addAllEventListener() {
    listenerPasswordImg()
}

function listenerPasswordImg() {
    passwordInput = document.getElementById('registerPassword');
    passwordToggle = document.getElementById('registerPasswordImg');
    visibleIcon = '../assets/img/visibleIcon.svg';
    unVisibleIcon = './assets/img/notVisibleIcon.svg';
    standartIcon = 'assets/img/loginPassword.svg';
    console.log('geladen')
    passwordInput.addEventListener('keyup', changePasswortImage);
    passwordToggle.addEventListener('click', togglePasswordVisibility);
}

function addUser() {
    var hasError = false;
    if (document.getElementById('registerName').value === '') {
        document.getElementById('registerNameError').classList.remove('d-none');
        hasError = true;
    } else {
        document.getElementById('registerNameError').classList.add('d-none');
    }
    if (document.getElementById('registerEmail').value === '') {
        document.getElementById('registerEmailError').classList.remove('d-none');
        hasError = true;
    } else {
        document.getElementById('registerEmailError').classList.add('d-none');
    }
    if (document.getElementById('registerPassword').value === '') {
        document.getElementById('registerPasswordError').classList.remove('d-none');
        hasError = true;

    } else {
        document.getElementById('registerPasswordError').classList.add('d-none');
    }
    if (!hasError) {
        document.getElementById("registerForm").submit();
        window.location.href = "login.html?msg=TestMessage"
    }
}


function togglePasswordVisibility() {
    if (passwordInput.value === '') {
        passwordToggle.src = standartIcon;
    } else {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.src = visibleIcon;
        } else {
            passwordInput.type = 'password';
            if (passwordToggle.src !== '/assets/img/loginPassword.svg') {
                passwordToggle.src = unVisibleIcon;
            }
        }
    }
}


function changePasswortImage() {
    if (passwordInput.value === '') {
        passwordToggle.src = standartIcon;
    } else if (passwordInput.type == 'text') {
        passwordToggle.src = visibleIcon;
    }
    else {
        passwordToggle.src = unVisibleIcon
    }
}