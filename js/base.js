/****************************************/
/*           global variables           */
/****************************************/
//Getting the complete URL and slice it by [0] to the directory URL, return the domain name.
var urlStr = window.location.toString().slice(0, window.location.toString().lastIndexOf(window.location.pathname) + 1);
//Getting the dir name by gathering the pathname and substract it with the last '/'.
var dirStr = window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/'));

/****************************************/
/*               functions              */
/****************************************/

function load(urlHTML, elementHTML, urlJS, elementJS) {
    fetch(urlHTML).then(res => {
        return res.text();
    }).then(htmltext => {
        return elementHTML.innerHTML = htmltext;
    }).then(loadedHTML => {
        loadJS(urlJS, elementJS);
    })
        .catch(
            function (err) {
                console.warn('Could not load ' + urlHTML + ': Add the correct tag ?', err);
            }
        );
}

function loadHTML(url, element) {
    fetch(url).then(res => {
        return res.text();
    }).then(htmltext => {
        element.innerHTML = htmltext;
    }).catch(
        function (err) {
            console.warn('Could not load ' + url + ': Add the correct tag ?', err);
        }
    );
}

function loadJS(url, element) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    element.appendChild(scriptTag);
}

function loadCSS(url, element) {
    var linkTag = document.createElement('link');
    linkTag.rel = "stylesheet";
    linkTag.href = url;
    element.appendChild(linkTag);
}

function ready(callback) {
    // in case the document is already rendered
    if (document.readyState != 'loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') callback();
    });
}

/**
 * Parse each character of the given string.
 * @param {string} string 
 * @returns number of '/' in the string
 */
function getSlashNum(string) {
    var returnValue = 0;
    for (char of string) {
        if (char == "/") {
            returnValue++;
        }
    }
    return returnValue;
}

/**
 * Will contenate a string of slash (num of parent dir) onto a given path
 * @param {Int, number of slashes} slashNum 
 * @param {Concat String} basePath 
 * @returns the concatened string
 */
function concatPath(slashNum, basePath) {
    var slashString = "";
    for (let i = 0; i < slashNum; i++) {
        slashString += "../";
    }
    return slashString + basePath;
}

function showPopUp(className) {
    document.getElementsByClassName(className)[0].style.display = "block";
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
}

function closePopUp(className) {
    document.getElementsByClassName(className)[0].style.display = "none";
    document.getElementsByTagName("body")[0].style.height = "";
    document.getElementsByTagName("body")[0].style.overflow = "";
}

function popUpPlacement(className) {
    var popup = document.getElementsByClassName(className)[0];
    var body = document.getElementsByTagName("body")[0];
    body.insertBefore(popup, body.firstChild)
}

/****************************************/
/*                 main                 */
/****************************************/

//Loading the html,js and css of navbar and footer
//During the loading process we need a loading status bar
var headTag = document.getElementsByTagName("head")[0];
window.addEventListener('load', function () {
    loadJS("//code.iconify.design/1/1.0.6/iconify.min.js", headTag)
    loadCSS(urlStr + "css/base.css", headTag);
    loadCSS(urlStr + "css/navbar.css", headTag);
    load(urlStr + "components/navbar.html", document.getElementsByTagName("Navbar")[0], urlStr + "js/navbar.js", headTag);
    loadCSS(urlStr + "css/footer.css", headTag);
    load(urlStr + "components/footer.html", document.getElementsByTagName("Footer")[0], urlStr + "js/footer.js", headTag)
    setTimeout(() => {
        //Will change
        popUpPlacement("black-bg");
    }, 500);
})