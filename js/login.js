
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
    addListener();
    loadRememberedData()
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


function addListener() {
    let passwordInput = document.getElementById('loginPassword');
    let passwordToggle = document.getElementById('loginPasswordImg');
    passwordInput.addEventListener('keyup', changePasswortImage)
    passwordToggle.addEventListener('click', togglePasswordVisibility);
}


function togglePasswordVisibility() {
    let passwordInput = document.getElementById('loginPassword');
    let passwordToggle = document.getElementById('loginPasswordImg');
    let visibleIcon = 'assets/img/visibleIcon.svg';
    let unVisibleIcon = 'assets/img/notVisibleIcon.svg';
    let standartIcon = 'assets/img/loginPassword.svg';
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


function changePasswortImage() {
    let passwordInput = document.getElementById('loginPassword');
    let passwordToggle = document.getElementById('loginPasswordImg');
    let visibleIcon = 'assets/img/visibleIcon.svg';
    let unVisibleIcon = 'assets/img/notVisibleIcon.svg';
    let standartIcon = 'assets/img/loginPassword.svg';
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

  let passwordInput;
  let passwordToggle;
 
  
  
  document.addEventListener('DOMContentLoaded', function () {
      addAllEventListener()
  });
  
  function addAllEventListener() {
      listenerPasswordImg()
  }
  
  function listenerPasswordImg() {
      passwordInput = document.getElementById('registerPassword');
      passwordToggle = document.getElementById('registerPasswordImg');
      visibleIcon = 'assets/img/visibleIcon.svg';
      unVisibleIcon = 'assets/img/notVisibleIcon.svg';
      standartIcon = 'assets/img/loginPassword.svg';
      console.log('geladen')
      passwordInput.addEventListener('keyup', changePasswortImage);
      passwordToggle.addEventListener('click', togglePasswordVisibility);
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
      if (document.getElementById('registerName').value === '') {
          document.getElementById('registerNameError').classList.remove('d-none');
          return true;
      } else {
          document.getElementById('registerNameError').classList.add('d-none');
      }
  }
  
  
  function checkSignUpEmail() {
      var email = document.getElementById('registerEmail').value;
  
      if (email === '') {
          document.getElementById('registerEmailError').classList.remove('d-none');
          return true;
      }
      if (email.indexOf('@') === -1) {
          document.getElementById('registerEmailFormatError').classList.remove('d-none');
          return true;
      }
  
      if (checkEmailExists(email)) {
          document.getElementById('registerEmailTakenError').classList.remove('d-none');
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
      if (document.getElementById('registerPassword').value === '') {
          document.getElementById('registerPasswordError').classList.remove('d-none');
          return true;
      }
      if (document.getElementById('registerPassword').value.length < 7) {
          document.getElementById('registerPasswordLengthError').classList.remove('d-none');
          return true;
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
              if (passwordToggle.src !== 'assets/img/loginPassword.svg') {
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
  
  
  async function addUser() {
      let name = document.getElementById('registerName')
      let email = document.getElementById('registerEmail');
      let password = document.getElementById('registerPassword')
      users.push({ name: name.value, email: email.value, password: password.value });
      await setServer();
      window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
  }