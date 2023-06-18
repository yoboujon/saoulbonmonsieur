var saoulAnimation = anime({
    targets: '.photosaoul',
    autoplay: false,
    rotate: -30,
    translateX: -380,
});

function superAnim() {
    saoulAnimation.restart();
}