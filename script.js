const colorOne = document.getElementById("one"); 
const colorTwo = document.getElementById("two");
const colorThree = document.getElementById("three");
const colorFour = document.getElementById("four");
const colorFive = document.getElementById("five"); 

document.addEventListener("DOMContentLoaded", () => {
    const elements = [
        
        document.getElementById("one"),
        document.getElementById("two"),
        document.getElementById("three"),
        document.getElementById("four"),
        document.getElementById("five"),
    ];

    function getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }

    setInterval(() => {

        elements.forEach((el, index) => {
            
            el.style.backgroundColor = getRandomColor();

            
            el.style.display = "flex";
        });
    }, 800);
}); 

const loader = document.querySelector(".loader");
const body = document.getElementById("pagina");

function avvia() {

    body.style.filter = "blur(10px)";
    loader.style.display = "flex";

    setTimeout(() => {
        loader.style.display = "none";
        body.style.filter = "none";
        window.location.href = "palette.html";
    }, 3000);
}

function index() {
    window.location.href = "index.html";
} 

function navbar() {
    const nav = document.getElementById("navbar");
    let overlay = document.getElementById("overlay");

    // Se l'overlay non esiste, crealo
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "overlay";
        document.body.appendChild(overlay);
    }

    // Mostra la navbar aggiungendo la classe "open" e mostra l'overlay
    nav.classList.add("open");
    overlay.classList.add("visible");

    // Aggiungi un event listener per chiudere la navbar al click sull'overlay
    overlay.addEventListener("click", closeNavbar);
}

function closeNavbar() {
    const nav = document.getElementById("navbar");
    const overlay = document.getElementById("overlay");

    nav.classList.remove("open");
    overlay.classList.remove("visible");

    // Rimuovi l'overlay dopo la transizione (opzionale)
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 300);
}

const pcPiccolo = document.querySelector(".pc-piccolo");
const crea = document.querySelector(".crea");
const pcGrande = document.querySelector(".pc-grande");
const esplora = document.querySelector(".esplora");

pcPiccolo.addEventListener("mouseenter", () => {
    crea.style.scale = "1.15";
})

pcPiccolo.addEventListener("mouseleave", () => {
    crea.style.scale = "1";
})

pcGrande.addEventListener("mouseenter", () => {
    esplora.style.scale = "1.15";
});

pcGrande.addEventListener("mouseleave", () => {
    esplora.style.scale = "1";
});

function registra() {
    window.location.href = "registrazione.html";
}

function login() {
    window.location.href = "login.html";
}