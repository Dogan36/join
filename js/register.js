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
    listenerErrorMsg()
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

function listenerErrorMsg() {
    const registerForm = document.getElementById('registerForm');
    const registerNameInput = document.getElementById('registerName');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');

    const registerNameError = document.getElementById('registerNameError');
    const registerEmailError = document.getElementById('registerEmailError');
    const registerPasswordError = document.getElementById('registerPasswordError');




    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (registerNameInput.value === '') {
            registerNameError.classList.remove('d-none');
        } else {
            registerNameError.classList.add('d-none');
        }

        if (registerEmailInput.value === '') {
            registerEmailError.classList.remove('d-none');
        } else {
            registerEmailError.classList.add('d-none');
        }

        if (registerPasswordInput.value === '') {
            registerPasswordError.classList.remove('d-none');
        } else {
            registerPasswordError.classList.add('d-none');
        }

    })
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