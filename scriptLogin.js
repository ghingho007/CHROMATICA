const bodyTwo = document.getElementById("body-tre");

function avvia() {

    bodyTwo.style.filter = "blur(10px)";
    loader.style.display = "flex";

    setTimeout(() => {
        loader.style.display = "none";
        bodyTwo.style.filter = "none";
        window.location.href = "index.html";
    }, 3000);
}