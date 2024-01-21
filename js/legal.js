
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
