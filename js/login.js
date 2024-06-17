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

/**
 * This function checks all inputs on login page and let user check in if no errors
 * 
 * @returns boolean
 */
function checkInputsLogin() {
    document.querySelectorAll(`.loginErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
    })
    let errorCount = 0;
    errorCount += checkInputEmpty('loginEmail') ? 1 : 0;
    errorCount += checkInputEmpty('loginPassword') ? 1 : 0;
    errorCount += checkEmailFormat('loginEmail') ? 1 : 0;
    errorCount += checkEmailDoesntExist('loginEmail') ? 1 : 0;
    errorCount += checkPasswordLength('loginPassword') ? 1 : 0;
    errorCount += checkIncorrectPassword('loginPassword') ? 1 : 0;
    if (errorCount > 0) return;
    checkIn()
  }
  
  /**
   * This function checks all inputs on sign up page and adds user if no error
   * 
   * @returns boolean
   */
  function checkInputsSignUp() {
    document.querySelectorAll(`.signUpErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
    })
    let errorCount = 0;
    errorCount += checkInputEmpty('signUpName') ? 1 : 0;
    errorCount += checkInputEmpty('signUpEmail') ? 1 : 0;
    errorCount += checkInputEmpty('signUpPassword') ? 1 : 0;
    errorCount += checkInputEmpty('confirmPassword') ? 1 : 0;
    errorCount += checkEmailFormat('signUpEmail') ? 1 : 0;
    errorCount += checkEmailExist('signUpEmail') ? 1 : 0;
    errorCount += checkPasswordLength('signUpPassword') ? 1 : 0;
    errorCount += checkPasswordConfirm('signUpPassword') ? 1 : 0;
    errorCount += checkPrivacyChecked() ? 1 : 0;
    if (errorCount > 0) return;
    addUser()
  }
  
  /**
   * This function checks all inputs on forgot password page and sends new password link if no errors
   * 
   * @returns boolean
   */
  function checkInputsForgot() {
    document.querySelectorAll(`.forgotErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
    })
    let errorCount = 0;
    errorCount += checkInputEmpty('forgotEmail') ? 1 : 0;
    errorCount += checkEmailFormat('forgotEmail') ? 1 : 0;
    errorCount += checkEmailDoesntExist('forgotEmail') ? 1 : 0;
    if (errorCount > 0) return;
    sendNewPasswordLink()
  }
  
  /**
   * This function checks all inputs on reset password page and updates password if no errors
   * 
   * @returns boolean
   */
  function checkInputsReset() {
    document.querySelectorAll(`.resetErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
    })
    let errorCount = 0;
    errorCount += checkInputEmpty('resetPassword') ? 1 : 0;
    errorCount += checkInputEmpty('confirmPassword') ? 1 : 0;
    errorCount += checkPasswordLength('resetPassword') ? 1 : 0;
    errorCount += checkPasswordMatch() ? 1 : 0;
    if (errorCount > 0) return;
    updatePassword()
  }
  
/**
 * This function checks if an email already exists in data otherwise shows error
 * 
 * @param {string} element ID of the element to be checked
 * @returns boolean
 */
function checkEmailExist(element) {
    let input = document.getElementById(`${element}`);
    let emailFound = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === input.value) {
        document.getElementById(`${element}InUseError`).classList.remove('d-none');
        return true;
      }
    }
    return false
  }
  
  /**
   * This function checks if an email doesn`t exists in data otherwise shows error
   * 
   * @param {string} element ID of the element to be checked
   * @returns boolean
   */
  function checkEmailDoesntExist(element) {
    let input = document.getElementById(`${element}`);
    let emailFound = false;
    for (let i = 0; i < users.length; i++) {
      if (input.value.length > 0 && input.value.includes('@') && users[i].email === input.value)
        return false;
    }
    if (input.value.length > 0 && input.value.includes('@')) document.getElementById(`${element}NotFoundError`).classList.remove('d-none');
    return true
  }

  /**
   * This function checks if an input has the minimum count of characters otherwise shows error
   * 
   * @param {string} element ID of element to be checked
   * @returns boolean
   */
  function checkPasswordLength(element) {
    let password = document.getElementById(`${element}`)
    if (password.value.length < 6 && password.value.length > 0) {
      document.getElementById(`${element}LengthError`).classList.remove('d-none');
      return true
    }
  }

  /**
   * This function checks if the password and confirmation password are identical otherwise shows error
   * 
   * @returns boolean
   */
  function checkPasswordConfirm() {
    let password = document.getElementById('signUpPassword')
    let passwordConfirm = document.getElementById('confirmPassword')
    if (password.value != passwordConfirm.value) {
      document.getElementById('confirmPasswordConfirmIdenticalError').classList.remove('d-none');
      return true
    }
  }
  
  /**
   * This function checks if the password is incorrect and shows error
   * 
   * @param {sting} element ID of the element where password is inserted
   * @returns boolean
   */
  function checkIncorrectPassword(element) {
    let user = getUser();
      let password = document.getElementById(`${element}`).value;
      if (user && user.password !== password && password.length >= 6) {
        document.getElementById(`${element}IncorrectError`).classList.remove('d-none');
        return true
      } else return false
    
  }
  /**
   * This functions checks if the privacy policy is checked otherwise shows error
   * 
   * @returns boolean
   */
  function checkPrivacyChecked() {
    let checkbox = document.getElementById('confirmationTerms');
    if (checkbox.checked != true) {
      document.getElementById('signUpPrivacyError').classList.remove('d-none')
      return true
    } else return false
  
  }
  
  /**
   * This function lets the user check in
   */
  function checkIn() {
    rememberMe()
    let currentUser = user.name
    window.location.href = 'index.html?variable=' + currentUser;
  }
  
  /**
   * This function sends an link to the user via e-mail to reset the password
   */
  function sendNewPasswordLink() {
    let email = document.getElementById('forgotEmail').value;
    let xhr = new XMLHttpRequest();
    let url = '//join.dogan-celik.com/send_mail.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                showConfirmation('newPassword');
                document.getElementById('forgotPassword').reset()
                setTimeout(function () {
                    closeConfirmation();
                    closeDarkBackground();
                    showContentLogin('loginContainer');
                }, 2000);
            } else {
                console.error("Fehler beim Senden der E-Mail:", xhr.status, xhr.responseText);
            }
        }
    };

    let message = `Hello,\n\nPlease click on the following link to reset your password: http://join.dogan-celik.com/reset.html?email=${email}\n\nBest regards,\nYour Join Team`;

    let params = `name=Join&mail=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;

    xhr.send(params);
}

  
  
  /**
   *This function checks of password and confirm passwort are identical on reset page
   */
  function checkPasswordMatch() {
    let password = document.getElementById('resetPassword').value
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) document.getElementById('confirmPasswordIncorrectError').classList.remove('d-none');
  }
  
  /**
   * This function updates the password of the user
   */
  async function updatePassword() {
    let params = new URLSearchParams(window.location.search);
    email = params.get('email');
    user = users.find(user => user.email === email);
    newPassword = document.getElementById('resetPassword').value
    user.password = newPassword;
    await setItem('users', users)
    showConfirmation('forgot')
    setTimeout(function () {
      closeConfirmation();
      closeDarkBackground();
      window.location.href='login.html'
  }, 2000);
  }

  /**
 * This function resets all inputs and error messages on sign up
 */
function resetSignUpInputs() {
    document.querySelector('.signUpContainer').reset();
    document.querySelectorAll(`.signUpErrorMessage`).forEach(function (el) {
      el.classList.add('d-none');
    })
  }
  
  /**
 * This function sets an eventlistener for the password images on input an click
 * 
 * @param {string} element This is the ID of the element which will get an eventlistener
 */
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
  
  /**
   * This function changes the src of an password img
   * 
   * @param {string} element This is the ID of the element to be changed
   */
  function changePasswortImage(element) {
    let passwordInput = document.getElementById(`${element}Password`);
    let passwordToggle = document.getElementById(`${element}PasswordImg`);
    if (passwordInput.value === '') passwordToggle.src = standartIcon;
    else if (passwordInput.type == 'text') passwordToggle.src = visibleIcon;
    else passwordToggle.src = notVisibleIcon
  }
  
  /**
   * This function changes the visibility of an password 
   * 
   * @param {string} element This is the ID of the element to be changed
   */
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
        if (passwordToggle.src !== 'assets/img/loginPassword.svg') passwordToggle.src = notVisibleIcon;
      }
    }
  }