let isContentLoaded = false
/**
 * This function shows selceted content and hides other
 * @param {string} x This is the id of the content to be shown
 */
function showContent(x) {
    let content = document.querySelectorAll(".indexContent");
    content.forEach(function (element) {
        element.classList.add("d-none");
    });
    document.getElementById(x).classList.remove('d-none')
}

/**
 * This function adds a class to a active element
 * 
 * @param {string} element This is the id of the element to get an active class
 */
function setActiveElement(element) {
    var icons = document.querySelectorAll(".desktopTemplateIconActive");
    var elementName = element.id;
    var mobileElementName = elementName + "Mobile";
    icons.forEach(function (icon) {
        icon.classList.remove("desktopTemplateIconActive");
    });
    document.getElementById('legalNotice').classList.remove('desktopTemplateIconActive')
    document.getElementById('legalNoticeMobile').classList.remove('desktopTemplateIconActive')
    element.classList.add("desktopTemplateIconActive");
    document.getElementById(`${mobileElementName}`).classList.add("desktopTemplateIconActive");
}
/**
 * This function calls get target after content is loaded
 */
function callTarget() {
    if (isContentLoaded) getTarget();
    else setTimeout(callTarget, 50); // Warten und erneut versuchen
}

callTarget()
/**
 * This function gets the target of the url to activate the active element
 */
function getTarget() {
    let legalButton = document.getElementById('legalNotice')
    let privacyButton = document.getElementById('privacyPolicy')
    let params = new URLSearchParams(window.location.search);
    let targetURL = params.get('target');
    if (targetURL) legalButton.click()
    else privacyButton.click()
}
