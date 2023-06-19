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
                console.warn('Could not load the Navbar.', err)
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
            console.warn('Could not load the Navbar.', err)
        }
    );
}

function loadJS(url, element) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    element.appendChild(scriptTag);
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
function concatPath(slashNum, basePath)
{
    var slashString = "";
    for (let i = 0; i < slashNum; i++) {
        slashString += "../";
    }
    return slashString+basePath;
}

/****************************************/
/*                 main                 */
/****************************************/

window.addEventListener('load', function () {
    load("../components/navbar.html", document.getElementsByTagName("Navbar")[0], concatPath(getSlashNum(window.location.pathname)-1,"js/navbar.js"), this.document.getElementsByTagName("head")[0]);
})