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


async function checkInputsSignUp() {
    document.getElementById('registerEmailError').classList.add('d-none');
    document.getElementById('registerEmailFormatError').classList.add('d-none');
    document.getElementById('registerEmailTakenError').classList.add('d-none');
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
        if (document.getElementById('registerPassword').value.length<7) {
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