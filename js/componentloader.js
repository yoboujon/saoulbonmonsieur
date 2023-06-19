
function load(url, element) {
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

window.addEventListener('load', function () {
    load("../components/navbar.html", document.getElementsByTagName("Navbar")[0]);
})

function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}