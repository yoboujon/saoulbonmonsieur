/****************************************/
/*           global variables           */
/****************************************/

var saulDisappeared = 0;

/****************************************/
/*                 animjs               */
/****************************************/

var nomoreSaoul = anime({
    targets: '.photosaoul',
    easing: 'easeInQuint',
    autoplay: false,
    opacity: 0,
    duration: 200
});

var saoulAnimation = anime({
    targets: '.photosaoul',
    easing: 'easeOutQuint',
    translateX: [
        { value: "", duration: 100, delay: 0 },
        { value: "130%", duration: 1000, delay: 100 }
    ],
    rotate: [
        { value: 0, duration: 100, delay: 0 },
        { value: -60, duration: 1000, delay: 100 }
    ],
    begin: function () {
        document.getElementsByClassName("photosaoul")[0].style.display = "flex";
    },
});

var whiteBandAnimation = anime({
    targets: '.whiteband',
    easing: 'easeInExpo',
    width: "100%",
    duration: 2200,
})

var textAnimation = anime({
    targets: '.anim-text',
    easing: 'easeInOutExpo',
    opacity: [
        { value: 0, duration: 2000, delay: 0 },
        { value: 100, duration: 1000, delay: 100 }
    ],
    begin: function () {
        document.getElementsByClassName("anim-text")[0].style.display = "block";
    },
})

/****************************************/
/*                 main                 */
/****************************************/

saoulAnimation.reverse()
ready(function () {
    setTimeout(() => {
        saoulAnimation.play();
        whiteBandAnimation.play();
        textAnimation.play();
    }, 1000);
});

window.addEventListener("scroll", function (e) {
    var saoulPhoto = document.getElementsByClassName("photosaoul")[0];
    if (document.getElementsByClassName("description")[0].getBoundingClientRect().y < 150) {
        if (saulDisappeared == 0) {
            saulDisappeared = 2;
            nomoreSaoul.play();
            nomoreSaoul.finished.then(() => {
                saoulPhoto.style.display = "none";
                saulDisappeared = 1;
            });
        }
    }
    else {
        if (saulDisappeared == 1) {
            saulDisappeared = 2;
            saoulPhoto.style.display = "block";
            nomoreSaoul.reverse();
            nomoreSaoul.play();
            nomoreSaoul.finished.then(() => {
                nomoreSaoul.reverse();
                saulDisappeared = 0;
            });
        }
    }
});

/****************************************/
/*               functions              */
/****************************************/

function superAnim() {
    saoulAnimation.play()
}