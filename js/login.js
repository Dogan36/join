document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const contentContainer = document.querySelector('.content-container');
  
    logo.addEventListener('animationend', () => {
      contentContainer.classList.add('show');
    });
  });
  

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);

}