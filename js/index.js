/****************************************/
/*           global variables           */
/****************************************/

//status if saoul has disappeared or not
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
    autoplay: false,
    translateX: [
        { value: "", duration: 100, delay: 0 },
        { value: "130%", duration: 1000, delay: 100 }
    ],
    rotate: [
        { value: 0, duration: 100, delay: 0 },
        { value: -780, duration: 1000, delay: 100 }
    ],
    begin: function () {
        document.getElementsByClassName("photosaoul")[0].style.display = "flex";
    },
});

var whiteBandAnimation = anime({
    targets: '.whiteband',
    easing: 'easeInExpo',
    autoplay: false,
    width: "100%",
    duration: 1200,
})

var textAnimation = anime({
    targets: '.anim-text',
    easing: 'easeInOutExpo',
    autoplay: false,
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

//playing the first animation on the page
saoulAnimation.reverse();
playIndexAnimation();

//eventlistener to make saoul dissapear when scrolling at a certain point
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

async function playIndexAnimation() {
    while (!finishedLoading) {
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    whiteBandAnimation.play();
    textAnimation.play();
    setTimeout(() => {
        saoulAnimation.restart();
    }, 1200);
}