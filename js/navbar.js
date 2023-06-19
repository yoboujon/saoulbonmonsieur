/****************************************/
/*           global variables           */
/****************************************/

var enterAnimation = false;
var dropdownList = document.getElementById("navbar_text-container").children[0].children;
var aTagList = getNavbarTextContainer();

/****************************************/
/*                 animjs               */
/****************************************/

var logoRotate = anime({
    targets: '.navbar_logo',
    rotateY: 180,
    duration: 1000,
    easing: 'easeOutExpo',
    autoplay: false,
    direction: 'normal',
    update: function (anim) {
        //console.log(anim.progress+" : enter ? "+enterAnimation);
        if (anim.progress >= 10 && enterAnimation) {
            document.getElementsByClassName("navbar_logo")[0].style.filter = "brightness(50%)";
        }
        if (anim.progress <= 10 && !enterAnimation) {
            document.getElementsByClassName("navbar_logo")[0].style.filter = "";
        }
    }
});

/****************************************/
/*               functions              */
/****************************************/

function setDropdown(display, element) {
    if (element.children.length > 1) {
        element.children[1].style.display = display;
    }
}

function getNavbarTextContainer() {
    var returnAtag = [];
    var container = document.getElementById("navbar_text-container");
    for (var aTag of container.children[0].children) {
        returnAtag.push(aTag.children[0])
    }
    return returnAtag;
}

function resetNavbar() {
    for (dropdownClass of document.getElementsByClassName("navbar_dropdown")) {
        dropdownClass.style.display = "none";
    }
}

/****************************************/
/*                 main                 */
/****************************************/

document.getElementById("navbar_logo-container").addEventListener("mouseenter", function () {
    enterAnimation = true;
    logoRotate.play();
    logoRotate.finished.then(() => {
        enterAnimation = false;
    })
});

document.getElementById("navbar_logo-container").addEventListener("mouseleave", function () {
    enterAnimation = false;
    logoRotate.reverse();
    logoRotate.play();
    logoRotate.finished.then(() => {
        logoRotate.reverse();
        enterAnimation = true;
    })
});

for (var dropdownElement of dropdownList) {
    var dropdownLink = dropdownElement.children[0];
    dropdownLink.addEventListener("click", function (e) {
        var dropdownLink = e.target.parentNode;
        resetNavbar();
        setDropdown("block", dropdownLink);
    });
}

window.addEventListener('click', function (e) {
    var clickState = false;
    for (dropdownClass of document.getElementsByClassName("navbar_dropdown")) {
        clickState |= dropdownClass.contains(e.target);
    }
    for (aTag of aTagList) {
        clickState |= aTag.contains(e.target);
    }
    if (!clickState) {
        resetNavbar();
    }
});