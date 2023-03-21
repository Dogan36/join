const passwordInput = document.getElementById('loginPassword');
    const passwordToggle = document.getElementById('loginPasswordImg');
    const visibleIcon = '/assets/img/visibleIcon.svg';
    const unVisibleIcon = '/assets/img/notVisibleIcon.svg';
    const standartIcon = '/assets/img/loginPassword.svg';

document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo');
    const contentContainer = document.querySelector('.loginContainer');
    logo.addEventListener('animationend', () => {
        contentContainer.classList.add('show');
    });
    updateCheckbox();
    addListener();
});


function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);

}


function updateCheckbox() {
    var checkbox = document.querySelector('input[type="checkbox"]');
    var pathChecked = document.getElementById('unchecked');
    var pathUnchecked = document.getElementById('checked');
    if (checkbox.checked) {
        pathChecked.style.display = 'block';
        pathUnchecked.style.display = 'none';
    } else {
        pathChecked.style.display = 'none';
        pathUnchecked.style.display = 'block';
    }
}



function addListener() {
    const passwordInput = document.getElementById('loginPassword');
    const passwordToggle = document.getElementById('loginPasswordImg');
 
    passwordInput.addEventListener('keyup', changePasswortImage)
    passwordToggle.addEventListener('click', togglePasswordVisibility);
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const passwordToggle = document.getElementById('loginPasswordImg');
    const visibleIcon = '/assets/img/visibleIcon.svg';
    const unVisibleIcon = '/assets/img/notVisibleIcon.svg';
    const standartIcon = '/assets/img/loginPassword.svg';
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
    const passwordInput = document.getElementById('loginPassword');
    const passwordToggle = document.getElementById('loginPasswordImg');
    const visibleIcon = '/assets/img/visibleIcon.svg';
    const unVisibleIcon = '/assets/img/notVisibleIcon.svg';
    const standartIcon = '/assets/img/loginPassword.svg';
    if (passwordInput.value === '') {
        passwordToggle.src = standartIcon;
    } else if (passwordInput.type == 'text') {
        passwordToggle.src = visibleIcon;
    }
    else {
        passwordToggle.src = unVisibleIcon
    }
}


