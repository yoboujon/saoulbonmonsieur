/****************************************/
/*           global variables           */
/****************************************/
//Getting the complete URL and slice it by [0] to the directory URL, return the domain name.
var urlStr = window.location.toString().slice(0, window.location.toString().lastIndexOf(window.location.pathname) + 1);
//Getting the dir name by gathering the pathname and substract it with the last '/'.
var dirStr = window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/'));
//the head tag
var headTag = document.getElementsByTagName("head")[0];
//the body tag
var bodyTag = document.getElementsByTagName("body")[0];
//Global variable set to true when finished loading external html/css/js files
var finishedLoading = false;

/****************************************/
/*               functions              */
/****************************************/

function load(urlHTML, elementHTML, urlJS, elementJS) {
    const returnPromise = new Promise((resolve, reject) => {
        fetch(urlHTML).then(res => {
            return res.text();
        }).then(htmltext => {
            return elementHTML.innerHTML = htmltext;
        }).then(loadedHTML => {
            loadJS(urlJS, elementJS);
            resolve(elementHTML);
        })
            .catch(
                function (err) {
                    reject('Could not load ' + urlHTML + ': Add the correct tag ?', err);
                }
            );
    });
    return returnPromise;
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

function popUpPlacement(className) {
    var popup = document.getElementsByClassName(className)[0];
    var body = document.getElementsByTagName("body")[0];
    body.insertBefore(popup, body.firstChild)
}

function loadingCreation() {
    var elementLoadingBg = document.createElement("div");
    elementLoadingBg.id="loading-bg";

    var elementLoadingContainer = document.createElement("div");
    elementLoadingContainer.id="loading-container";

    //the text inside the container
    var elementLoadingContentTxt = document.createElement("div");
    elementLoadingContentTxt.className="loading-content";
    var txt = document.createElement("p");
    txt.innerHTML="Loading...";
    elementLoadingContentTxt.appendChild(txt);

    //the image inside the container
    var elementLoadingContentImg = document.createElement("div");
    elementLoadingContentImg.className="loading-content";
    var img = document.createElement("img");
    img.className = "loading-img";
    img.src = "assets/Logo.png";
    elementLoadingContentImg.appendChild(img);

    //we then append all
    elementLoadingContainer.append(elementLoadingContentImg);
    elementLoadingContainer.append(elementLoadingContentTxt);
    elementLoadingBg.append(elementLoadingContainer);
    return elementLoadingBg;
}

/****************************************/
/*                 main                 */
/****************************************/
//Adding the loading bar
var loadingElement = loadingCreation();
bodyTag.insertBefore(loadingElement, bodyTag.firstChild);

//We then create the animation
var loadingAnimation = anime({
    targets: '.loading-content .loading-img',
    easing: 'easeOutQuint',
    translateY: [
        { value: -30, duration: 1000, delay: 0 },
        { value: -30, duration: 500, delay: 0 },
        { value: 0, duration: 1000, delay: 0 }
    ],
    loop: true
});

//Loading the html,js and css of navbar and footer
window.addEventListener('load', function () {
    //instant loading
    loadJS("//code.iconify.design/1/1.0.6/iconify.min.js", headTag);
    loadCSS(urlStr + "css/navbar.css", headTag);
    loadCSS(urlStr + "css/footer.css", headTag);
    //async loading
    load(urlStr + "components/navbar.html", document.getElementsByTagName("Navbar")[0], urlStr + "js/navbar.js", headTag).then(() => {
        load(urlStr + "components/footer.html", document.getElementsByTagName("Footer")[0], urlStr + "js/footer.js", headTag).then(() => {
            finishedLoading = true;
            popUpPlacement("black-bg");
            document.getElementById("loading-bg").style.display = "none";
        });
    });
})