/****************************************/
/*               functions              */
/****************************************/

function showPopUp(className) {
    document.getElementsByClassName(className)[0].style.display = "block";
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
}

function closePopUp(className) {
    document.getElementsByClassName(className)[0].style.display = "none";
    document.getElementsByTagName("body")[0].style.height = "";
    document.getElementsByTagName("body")[0].style.overflow = "";
}