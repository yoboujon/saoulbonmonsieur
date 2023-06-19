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

/****************************************/
/*                 main                 */
/****************************************/

window.addEventListener('load', function () {
    load("../components/navbar.html", document.getElementsByTagName("Navbar")[0],"js/navbar.js", this.document.getElementsByTagName("head")[0]);
})