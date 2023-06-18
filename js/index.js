var saoulAnimation = anime({
    targets: '.photosaoul',
    easing: 'easeOutQuint',
    translateX: [
        {value: 0, duration: 100, delay: 0 },
        {value: "100%", duration: 600, delay: 100 }
    ],
    rotate : [
        {value: 0, duration: 100, delay: 0 },
        {value: 30, duration: 600, delay: 100 }
    ],
    begin: function () {
        document.getElementsByClassName("photosaoul")[0].style.display = "flex";
    },
});

saoulAnimation.reverse()

function superAnim() {
    saoulAnimation.restart()
}