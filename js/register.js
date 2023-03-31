let passwordInput;
let passwordToggle;
let visibleIcon;
let unVisibleIcon;
let standartIcon;


document.addEventListener('DOMContentLoaded', function () {
    passwordInput = document.getElementById('registerPassword');
    passwordToggle = document.getElementById('registerPasswordImg');
    visibleIcon = '../assets/img/visibleIcon.svg';
    unVisibleIcon = './assets/img/notVisibleIcon.svg';
    standartIcon = 'assets/img/loginPassword.svg';
    console.log('geladen')
    passwordInput.addEventListener('keyup', changePasswortImage);
    passwordToggle.addEventListener('click', togglePasswordVisibility);
});


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





