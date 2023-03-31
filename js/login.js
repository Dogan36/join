
    let visibleIcon = '/assets/img/visibleIcon.svg';
    let unVisibleIcon = '/assets/img/notVisibleIcon.svg';
    let standartIcon = '/assets/img/loginPassword.svg';

document.addEventListener('DOMContentLoaded', function () {
    let logo = document.querySelector('.logo');
    let contentContainer = document.querySelector('.loginContainer');
    logo.addEventListener('animationend', () => {
        contentContainer.classList.add('show');
    });
    updateCheckbox();
    addListener();
});



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
    let passwordInput = document.getElementById('loginPassword');
    let passwordToggle = document.getElementById('loginPasswordImg');
 
    passwordInput.addEventListener('keyup', changePasswortImage)
    passwordToggle.addEventListener('click', togglePasswordVisibility);
}

function togglePasswordVisibility() {
    let passwordInput = document.getElementById('loginPassword');
    let passwordToggle = document.getElementById('loginPasswordImg');
    let visibleIcon = '/assets/img/visibleIcon.svg';
    let unVisibleIcon = '/assets/img/notVisibleIcon.svg';
    let standartIcon = '/assets/img/loginPassword.svg';
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
    let passwordInput = document.getElementById('loginPassword');
    let passwordToggle = document.getElementById('loginPasswordImg');
    let visibleIcon = '/assets/img/visibleIcon.svg';
    let unVisibleIcon = '/assets/img/notVisibleIcon.svg';
    let standartIcon = '/assets/img/loginPassword.svg';
    if (passwordInput.value === '') {
        passwordToggle.src = standartIcon;
    } else if (passwordInput.type == 'text') {
        passwordToggle.src = visibleIcon;
    }
    else {
        passwordToggle.src = unVisibleIcon
    }
}


