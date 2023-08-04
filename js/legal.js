let isContentLoaded = false
function showContent(x) {
    var content = document.querySelectorAll(".indexContent");
   
    content.forEach(function (element) {
      element.classList.add("d-none");
    });
    document.getElementById(x).classList.remove('d-none')
  
  }

  function setActiveElement(element) {
    var icon = document.querySelector(".desktopTemplateIconActive");
    icon.classList.remove("desktopTemplateIconActive");
  
    document.getElementById('legalNotice').classList.remove('desktopTemplateIconActive')
    element.classList.add("desktopTemplateIconActive");
  }

  function callTarget() {
    if (isContentLoaded) {
      getTarget();
    } else {
        setTimeout(callTarget, 50); // Warten und erneut versuchen
    }
  }
  
  callTarget()

  function getTarget() {
    
let legalButton = document.getElementById('legalNotice')
    let params = new URLSearchParams(window.location.search);
  
    let targetURL = params.get('target');
    if (targetURL) legalButton.click();
  }