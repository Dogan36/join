function sendNewPasswordLink() {
    let email = document.getElementById('forgotEmail').value
    const xhr = new XMLHttpRequest();
    const url = '//gruppenarbeit-485join.developerakademie.net/join/send_mail.php';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Success!
        console.log('Email sent!');
      }
    };
  
    const message = `Hello,\n\nPlease click on the following link to reset your password: http://gruppenarbeit-485join.developerakademie.net/join/forgot.html?email=${email}\n\nBest regards,\nYour Join Team`;
    const params = `name=Join&mail=noreply@join.com&message=${message}`;
  
    xhr.send(params);
  }

  function changePassword(){
    getCurrentUser()
    
  }