/****************************************/
/*           global variables           */
/****************************************/

//When window width >800 set to true
var mobileMode = false
//enterAnimation is a status linked to mouseenter/leave of the icon
var enterAnimation = false;
//same but for menu
var enterMenuAnimation = false;
//when menu is opened or not
var menuOpened = false;
//each <li> tag of the navbar_text-container
var dropdownList = document.getElementById("navbar_text-container").children[1].children;
//each <a> tag in the navbar
var aTagList = getNavbarTextContainer();
//a list
var dropdownStatus = Array(aTagList.length).fill(false);
//navbarDropdown Element
var navbarDropdown = document.getElementsByClassName("navbar_dropdown");
//menu close SVG Element
var menuCloseElement = document.getElementsByClassName("navbar_menu-close-btn")[0].children[0];
//menu hamburger SVG Element
var menuOpenElement = document.getElementsByClassName("navbar_menu-click")[0].children[0];

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
        //at 10% progress the logo rotate at 90deg, so it is invisible
        //At mouseenter we darken the logo, otherwise we set it to a normal color
        if (anim.progress >= 10 && enterAnimation) {
            document.getElementsByClassName("navbar_logo")[0].style.filter = "brightness(50%)";
        }
        if (anim.progress <= 10 && !enterAnimation) {
            document.getElementsByClassName("navbar_logo")[0].style.filter = "";
        }
    }
});

var menuAnimation = anime({
    targets: '.navbar_menu-click polygon',
    points: [
        { value: '3,6 21,6 21,8 3,8 3,6 3,11 21,11 21,13 3,13 3,11 3,16 21,16 21,18 3,18 3,16', duration: 10, delay: 0 },
        { value: '15.410 16.580, 10.830 12.000, 15.410 7.410, 14.000 6.000, 8.000 12.000, 14.000 18.000, 15.410 16.580', duration: 200, delay: 10 }
    ],
    scale: 1,
    easing: 'easeOutExpo',
    autoplay: false,
});

var navbarAnimation = anime({
    targets: '#navbar_text-container',
    translateX: [
        { value: "", duration: 0, delay: 0 },
        { value: "-20rem", duration: 300, delay: 0 }
    ],
    easing: 'easeOutExpo',
    autoplay: false
})

/****************************************/
/*               functions              */
/****************************************/

/**
 * With a given display property and element, if the length
 * of the given element is >1, set the [1] element's style to the given display
 * @param {string} display 
 * @param {documentElement} element 
 */
function setDropdown(display, element) {
    if (element.children.length > 1) {
        //If length > 1, set the style to the given display
        element.children[1].style.display = display;
    }
}

/**
 * @returns the array of a tag in the navbar container
 */
function getNavbarTextContainer() {
    var returnAtag = [];
    //For each a tag we found in the text container, push the element to the return array
    for (var aTag of dropdownList) {
        returnAtag.push(aTag.children[0])
    }
    return returnAtag;
}

/**
 * reset every dropdown display to none
 */
function resetNavbar() {
    //For each dropdown found with the given classname, will set the display to none
    for (var dropdownClass of navbarDropdown) {
        dropdownClass.style.display = "none";
    }
}

function openMenu(playAnimation) {
    menuOpened=true;
    if (playAnimation) {
        document.getElementById("navbar_text-container").style.display = "block";
        navbarAnimation.reverse();
        navbarAnimation.restart();
    }
    else {
        document.getElementById("navbar_text-container").style.display = "block";
    }
}

function closeMenu(playAnimation) {
    menuOpened=false;
    if (playAnimation) {
        navbarAnimation.reverse();
        navbarAnimation.restart();
        navbarAnimation.finished.then(() => {
            document.getElementById("navbar_text-container").style.display = "none";
        })
    }
    else {
        document.getElementById("navbar_text-container").style.display = "none";
    }
}

/****************************************/
/*                 main                 */
/****************************************/

//Setting the logo URL
document.getElementsByClassName("navbar_logo")[0].src = urlStr + "/assets/Logo.png";
//Setting the logo href
document.getElementById("navbar_logo-home").href = urlStr;

//Setting the href links for in directory links
var urlOffset = urlStr.length
//if dir found, we apply the dir offset + '/' (1 char)
if (dirStr.length > 1) {
    urlOffset = urlOffset + dirStr.length + 1;
}
//dor evry dropdown of the navbar we check each <a> 
for (var dropdown of navbarDropdown) {
    for (var aTagDropdown of dropdown.children) {
        //We slice the href with the url and the directory offset
        var pathStr = aTagDropdown.href.slice(urlOffset, aTagDropdown.href.length);
        //We then put again the url and the path we want
        aTagDropdown.href = urlStr + pathStr;
    }
}
//We do the same but with aTag replacing aTagDropdown, each <a> of the aTagList
for (var aTag of aTagList) {
    //only aTag that are not blank (=#0) are affected
    if (!(aTag.href.includes("#0"))) {
        var pathStr = aTag.href.slice(urlOffset, aTag.href.length);
        aTag.href = urlStr + pathStr;
    }
}

//Mouse enter for the logo
document.getElementById("navbar_logo-container").addEventListener("mouseenter", function () {
    //enterAnimation is now true (see update in logoRotate)
    enterAnimation = true;
    //Will play the animation and when finished set enterAnimation to false
    logoRotate.play();
    logoRotate.finished.then(() => {
        enterAnimation = false;
    })
});

//Mouse leave for the logo
document.getElementById("navbar_logo-container").addEventListener("mouseleave", function () {
    //enterAnimation is now false (see update in logoRotate)
    enterAnimation = false;
    logoRotate.reverse();
    logoRotate.play();
    //Will play the reversed animation and when finished set enterAnimation to true and and cancel the reverse
    logoRotate.finished.then(() => {
        logoRotate.reverse();
        enterAnimation = true;
    })
});

//For each dropdownElement we add a click event
for (var dropdownElement of dropdownList) {
    var dropdownLink = dropdownElement.children[0];
    dropdownLink.addEventListener("click", function (e) {
        if (e.target.parentNode.children.length > 1) {
            var styleDropdown = e.target.parentNode.children[1].style.display;
            //We reset all navbar
            resetNavbar();
            //If the dropdown was hidden, show the item
            if (!(styleDropdown == "block")) {
                //we get the parent node of the <a> tag
                var dropdownLink = e.target.parentNode;
                setDropdown("block", dropdownLink);
            }
        }
    });
}

//For any click of the window
window.addEventListener('click', function (e) {
    //clickState is set to 1 if the click is done outside any dropdownElement or the dropdown itself
    var clickState = false;
    for (var dropdownClass of navbarDropdown) {
        clickState |= dropdownClass.contains(e.target);
    }
    for (aTag of aTagList) {
        clickState |= aTag.contains(e.target);
    }
    //if the mouse is outside any aTag/dropdownClass we reset any navbar
    if (!clickState) {
        resetNavbar();
    }
});

//When changing the window size
window.addEventListener('resize', function (e) {
    if ((window.innerWidth > 800) && mobileMode) {
        //when switching from mobile to computer
        document.getElementById("navbar_text-container").style.transform = "";
        openMenu(false);
        if(menuOpened)
        {
            navbarAnimation.reverse();
        }
        mobileMode = false;
    }
    if ((window.innerWidth < 800) && !mobileMode) {
        //when switching from computer to mobile
        console.log("computer to mobile");
        closeMenu(false);
        mobileMode = true;
    }
});

//Animation to be played when hovering the menu
menuOpenElement.addEventListener("mouseenter", function () {
    //enterAnimation is now true (see update in logoRotate)
    enterMenuAnimation = true;
    //Will play the animation and when finished set enterAnimation to false
    menuAnimation.play();
    menuAnimation.finished.then(() => {
        enterMenuAnimation = false;
    })
});

//Animation to be played when leaving the menu
menuOpenElement.addEventListener("mouseleave", function () {
    //enterAnimation is now false (see update in logoRotate)
    enterMenuAnimation = false;
    menuAnimation.reverse();
    menuAnimation.play();
    //Will play the reversed animation and when finished set enterAnimation to true and and cancel the reverse
    menuAnimation.finished.then(() => {
        menuAnimation.reverse();
        enterMenuAnimation = true;
    })
});