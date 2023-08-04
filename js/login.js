let user


document.addEventListener('DOMContentLoaded', function () {
    let logo = document.querySelector('.logo');
    let contentContainer = document.querySelector('.loginContainer');
    let loginTopRight = document.querySelector('.loginTopRight')
    let notice = document.querySelector('.notice')
    logo.addEventListener('animationend', () => {
        loginTopRight.classList.add('show');
        contentContainer.classList.add('show');
        notice.classList.add('show');

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
    let password = document.getElementById('signUpPassword');
    let initials = getInitials('signUpName')
    users.push({name: name.value, email: email.value, password: password.value, initials: initials});
    showConfirmation('signedUp')
    await setServer();
    setTimeout(function() {
        closeConfirmation();
        closeDarkBackground();
        showContentLogin('loginContainer');
      }, 3000);
}


function showContentLogin(element) {
    document.querySelector('.loginTopRight').classList.add('d-none')
    document.querySelector('.loginContainer').classList.add('d-none')
    document.querySelector('.signUpContainer').classList.add('d-none')
    document.querySelector('.forgotPassword').classList.add('d-none')
    document.querySelector(`.${element}`).classList.remove('d-none')

    if(element=='loginContainer' || element =='forgotPassword'){
        document.querySelector('.loginTopRight').classList.remove('d-none')
    }
}

















