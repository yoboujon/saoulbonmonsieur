var carreAnim = anime({
    targets: '.test',
    autoplay: false,
    translateX: 250,
});

function superAnim() {
    carreAnim.restart();
    carreAnim.anime();
}