let user
/**
 * This functions adds various event listeners after dom content is loaded
 */
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
    updateCheckboxConfirmationTerms();
    listenerPasswordImg('login');
    listenerPasswordImg('signUp');
    listenerPasswordImg('confirm');
    loadRememberedData();
    changePasswortImage('login')
});

/**
 * This function updates the checkbox of remember me
 */
function updateCheckbox() {
    var checkbox = document.getElementById('rememberMe');
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

/**
 * This function updates the checkbox of confirmation terms
 */
function updateCheckboxConfirmationTerms() {
    var checkbox = document.getElementById('confirmationTerms');
    var pathChecked = document.getElementById('checkedTerms');
    var pathUnchecked = document.getElementById('uncheckedTerms');
    if (checkbox.checked) {
        pathChecked.style.display = 'block';
        pathUnchecked.style.display = 'none';
    } else {
        pathChecked.style.display = 'none';
        pathUnchecked.style.display = 'block';
    }
}
/**
 * This function gets the user by searching in users with the email
 * 
 * @returns boolean
 */
function getUser() {
    let email = document.getElementById('loginEmail').value;
    user = users.find(user => user.email === email);
    return user
}
/**
 * This function sets in local storage if user checked remember me checkbox
 */
function rememberMe() {
    let checkbox = document.getElementById('rememberMe');
    let usernameInput = document.getElementById('loginEmail');
    if (checkbox.checked) {
        localStorage.setItem('rememberedUser', usernameInput.value);
    } else {
        localStorage.removeItem('rememberedUser');
        document.querySelector('.loginContainer').reset()
    }
}

/**
 * This funtion loads data of remembered user from local storage and sets it if available
 */
function loadRememberedData() {
    let rememberedUser = localStorage.getItem('rememberedUser');
    let usernameInput = document.getElementById('loginEmail');
    if (rememberedUser) {
        usernameInput.value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
}

/**
 * This function adds user to users array and calls confirmation
 */
async function addUser() { 
    let name = document.getElementById('signUpName')
    let email = document.getElementById('signUpEmail');
    let password = document.getElementById('signUpPassword');
    let initials = getInitials('signUpName')
    users.push({name: name.value, email: email.value, password: password.value, initials: initials});
    showConfirmation('signedUp')
   await setItem('users', users);
    setTimeout(function() {
        closeConfirmation();
        closeDarkBackground();
        showContentLogin('loginContainer');
      }, 2000);
}
/**
 * This funtion shows choosen content and hides others.
 * 
 * @param {string} element This is id of the element to be shown
 */
function showContentLogin(element) {
    document.querySelector('.loginTopRight').classList.add('d-none')
    document.getElementById('loginContainer').classList.add('d-none')
    document.getElementById('signUpContainer').classList.add('d-none')
    document.getElementById('forgotPassword').classList.add('d-none')
    document.getElementById(`${element}`).classList.remove('d-none')
    if(element=='loginContainer'){
        document.querySelector('.loginTopRight').classList.remove('d-none')
    }
}

