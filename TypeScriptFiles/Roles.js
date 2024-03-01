"use strict";
function hamburgerOpen() {
    var element = document.getElementsByClassName('left-container');
    var hamburger = document.getElementsByClassName('hamburger-menu');
    var mainContainer = document.getElementsByClassName('main-container');
    element[0].style.display = 'none';
    hamburger[0].classList.add('hamburger-open');
    hamburger[0].style.display = 'block';
    mainContainer[0].classList.add('expand');
}
function hamburgerClose() {
    var leftUpdate = document.getElementsByClassName('left-container-update');
    var element = document.getElementsByClassName('left-container');
    var hamburger = document.getElementsByClassName('hamburger-menu');
    var mainContainer = document.getElementsByClassName('main-container');
    hamburger[0].style.display = 'none';
    element[0].style.display = 'block';
    leftUpdate[0].style.marginTop = '75%';
    mainContainer[0].classList.add('hamburger-close');
}
