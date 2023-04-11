
let visibleIcon = 'assets/img/visibleIcon.svg';
let unVisibleIcon = 'assets/img/notVisibleIcon.svg';
let standartIcon = 'assets/img/loginPassword.svg';

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
    passwordInput.addEventListener('keyup', function() {
      changePasswortImage(element);
    });
    passwordToggle.addEventListener('click', function() {
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
                passwordToggle.src = unVisibleIcon;
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
        passwordToggle.src = unVisibleIcon
    }
}


async function checkInputsLogin() {
    document.querySelectorAll('.errorMessage').forEach(function (el) {
        el.classList.add('d-none');
    })
    checkLoginEmail()
}


async function checkLoginEmail() {
    const email = document.getElementById('loginEmail');
    user = await getUser(email.value);
    if (email.value === '') {
        document.getElementById('loginEmailError').classList.remove('d-none');
        return
    }
    if (email.value.indexOf('@') === -1) {
        document.getElementById('loginEmailFormatError').classList.remove('d-none');
        return
    }
    if (!user) {
        document.getElementById('loginEmailNotFoundError').classList.remove('d-none');
        return
    } else {
        checkLoginPassword()
    }
}


async function checkLoginPassword() {
    const password = document.getElementById('loginPassword').value;
    let userPassword = await getPassword(user);
    if (password === '') {
        document.getElementById('loginPasswordError').classList.remove('d-none');
        return
    }
    if (password.length < 7) {
        document.getElementById('loginPasswordLengthError').classList.remove('d-none');
        return
    }
    if (password !== userPassword) {
        document.getElementById('loginPasswordIncorrectError').classList.remove('d-none');
        return
    }
    rememberMe()
    let currentUser=user.name
    window.location.href = 'index.html?variable=' + currentUser; 
}


async function getUser(email) {
    user = users.find(user => user.email === email);
    return user;
}


async function getPassword(user) {
    const password = user.password;
    return password;
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
 
  
  async function checkInputsSignUp() {
      document.querySelectorAll('.errorMessage').forEach(function(el) {
          el.classList.add('d-none');
      });
      var hasError = false;
      if (checkSignUpName()) {
          hasError = true;
      }
      if (checkSignUpEmail()) {
          hasError = true;
      }
      if (checkSignUpPassword()) {
          hasError = true;
      }
      if (!hasError) {
          await addUser()
      }
  }
  
  
  function checkSignUpName() {
      if (document.getElementById('signUpName').value === '') {
          document.getElementById('signUpNameError').classList.remove('d-none');
          return true;
      } else {
          document.getElementById('signUpNameError').classList.add('d-none');
      }
  }
  
  
  function checkSignUpEmail() {
      var email = document.getElementById('signUpEmail').value;
  
      if (email === '') {
          document.getElementById('signUpEmailError').classList.remove('d-none');
          return true;
      }
      if (email.indexOf('@') === -1) {
          document.getElementById('signUpEmailFormatError').classList.remove('d-none');
          return true;
      }
  
      if (checkEmailExists(email)) {
          document.getElementById('signUpEmailTakenError').classList.remove('d-none');
          return true;
      }
  
  }
  
  function checkEmailExists(email) {
      for (var i = 0; i < users.length; i++) {
          if (users[i].email === email) {
              return true;
          }
      }
  }
  
  function checkSignUpPassword() {
      if (document.getElementById('signUpPassword').value === '') {
          document.getElementById('signUpPasswordError').classList.remove('d-none');
          return true;
      }
      if (document.getElementById('signUpPassword').value.length < 7) {
          document.getElementById('signUpPasswordLengthError').classList.remove('d-none');
          return true;
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

  function showContentLogin(element){
    document.querySelector('.loginContainer').classList.add('d-none')
    document.querySelector('.signUpContainer').classList.add('d-none')
    document.querySelector('.forgotPassword').classList.add('d-none')
    document.querySelector(`.${element}`).classList.remove('d-none')
  }
