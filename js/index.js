var saoulAnimation = anime({
    targets: '.photosaoul',
    easing: 'easeOutQuint',
    translateX: [
        {value: "", duration: 100, delay: 0 },
        {value: "130%", duration: 1000, delay: 100 }
    ],
    rotate : [
        {value: 0, duration: 100, delay: 0 },
        {value: -60, duration: 1000, delay: 100 }
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
    opacity : [
        {value: 0, duration: 2000, delay: 0 },
        {value: 100, duration: 1000, delay: 100 }
    ],
    begin: function () {
        document.getElementsByClassName("anim-text")[0].style.display = "block";
    },
})

saoulAnimation.reverse()
ready(function(){
    setTimeout(() => {
        saoulAnimation.play();
        whiteBandAnimation.play();
        textAnimation.play();
    }, 1000);
});

function superAnim() {
    saoulAnimation.play()
}