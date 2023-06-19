/****************************************/
/*           global variables           */
/****************************************/

//enterAnimation is a status linked to mouseenter/leave of the icon
var enterAnimation = false;
//each <li> tag of the navbar_text-container
var dropdownList = document.getElementById("navbar_text-container").children[0].children;
//each <a> tag in the navbar
var aTagList = getNavbarTextContainer();
//a list
var dropdownStatus = Array(aTagList.length).fill(false);
//list of dropdown links
var dropdownLinks = ["droits/penal.html","droits/affaire.html","join/contact.html","join/coordonees.html"];
//list of container links
var containerLinks = ["avocat"];
//navbarDropdown Element
var navbarDropdown = document.getElementsByClassName("navbar_dropdown");

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
    var container = document.getElementById("navbar_text-container");
    //For each a tag we found in the text container, push the element to the return array
    for (var aTag of container.children[0].children) {
        returnAtag.push(aTag.children[0])
    }
    return returnAtag;
}

/**
 * reset every dropdown display to none
 */
function resetNavbar() {
    //For each dropdown found with the given classname, will set the display to none
    for (dropdownClass of navbarDropdown) {
        dropdownClass.style.display = "none";
    }
}

/****************************************/
/*                 main                 */
/****************************************/

//Setting the href links for in directory links
var dropdownCount = 0;
for(var dropdown of navbarDropdown)
{
    for(var aTagDropdown of dropdown.children)
    {
        aTagDropdown.href = concatPath(getSlashNum(window.location.pathname)-1,dropdownLinks[dropdownCount]);
        dropdownCount++;
    }
}
dropdownCount = 0;
for(var aTag of aTagList)
{
    console.log(aTag);
    if(!(aTag.href.includes("#0")))
    {
        console.log(aTag);
        aTag.href = concatPath(getSlashNum(window.location.pathname)-1,containerLinks[dropdownCount]);
        dropdownCount++;
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
        if (e.target.parentNode.children.length > 1)
        {
            var styleDropdown = e.target.parentNode.children[1].style.display;
            //We reset all navbar
            resetNavbar();
            //If the dropdown was hidden, show the item
            if(!(styleDropdown == "block")) {
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
    for (dropdownClass of navbarDropdown) {
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