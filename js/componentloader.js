
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