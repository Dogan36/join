function onMouseOverImg(id, src) {
    document.getElementById(id).setAttribute('src', src);
}

function onMouseOutImg(id, src) {
    document.getElementById(id).setAttribute('src', src);
}

function  greetingAds() {
    let now = new Date();
    let hours = now.getHours();

    let greeting;
    if (hours >= 6 && hours < 11) {
        greeting = "Good morning";
    } else if (hours >= 11 && hours < 18) {
        greeting = "Good afternoon";
    } else if (hours >= 18 && hours < 23) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }
    document.getElementById('welcome-text-desk').innerHTML = greeting;
    setTimeout(greetingAds, 1000);
}