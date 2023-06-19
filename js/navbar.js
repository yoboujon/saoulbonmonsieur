var enterAnimation;

var logoRotate = anime({
    targets: '.navbar_logo',
    rotateY: 180,
    duration: 1000,
    easing: 'easeOutExpo',
    autoplay: false,
    direction: 'normal',
    update: function(anim){
        console.log(anim.progress+" : enter ? "+enterAnimation);
        if(anim.progress >= 10 && enterAnimation)
        {
            document.getElementsByClassName("navbar_logo")[0].style.filter = "brightness(50%)";
        }
        if(anim.progress <= 10 && !enterAnimation)
        {
            document.getElementsByClassName("navbar_logo")[0].style.filter = "";
        }
    }
});

document.getElementById("navbar_logo-container").addEventListener("mouseenter", function () {
    enterAnimation = true; 
    logoRotate.play();
    logoRotate.finished.then(() => {
        enterAnimation = false;  
    })
});

document.getElementById("navbar_logo-container").addEventListener("mouseleave", function () {
    console.log("leave")
    enterAnimation = false;
    logoRotate.reverse();
    logoRotate.play();
    logoRotate.finished.then(() => {
        logoRotate.reverse();
        enterAnimation = true;
    })
});