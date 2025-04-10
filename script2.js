function index() {
    window.location.href = "index.html";
} 

const lucchettoChiuso = document.getElementById("lock-one");
const lucchettoAperto = document.getElementById("open-one");

function apriLucchetto() {
    lucchettoChiuso.style.display = "none";
    lucchettoAperto.style.display = "flex";
}

function chiudiLucchetto() {
    lucchettoChiuso.style.display = "flex";
    lucchettoAperto.style.display = "none";
}

const lucchettoChiusodue = document.getElementById("lock-two");
const lucchettoApertodue = document.getElementById("open-two");

function apriLucchettodue() {
    lucchettoChiusodue.style.display = "none";
    lucchettoApertodue.style.display = "flex";
}

function chiudiLucchettodue() {
    lucchettoChiusodue.style.display = "flex";
    lucchettoApertodue.style.display = "none";
}

const lucchettoChiusotre = document.getElementById("lock-three");
const lucchettoApertotre = document.getElementById("open-three");

function apriLucchettotre() {
    lucchettoChiusotre.style.display = "none";
    lucchettoApertotre.style.display = "flex";
}

function chiudiLucchettotre() {
    lucchettoChiusotre.style.display = "flex";
    lucchettoApertotre.style.display = "none";
}

const lucchettoChiusoquattro = document.getElementById("lock-four");
const lucchettoApertoquattro = document.getElementById("open-four");

function apriLucchettoquattro() {
    lucchettoChiusoquattro.style.display = "none";
    lucchettoApertoquattro.style.display = "flex";
}

function chiudiLucchettoquattro() {
    lucchettoChiusoquattro.style.display = "flex";
    lucchettoApertoquattro.style.display = "none";
}

const lucchettoChiusocinque = document.getElementById("lock-five");
const lucchettoApertocinque = document.getElementById("open-five");

function apriLucchettocinque() {
    lucchettoChiusocinque.style.display = "none";
    lucchettoApertocinque.style.display = "flex";
}

function chiudiLucchettocinque() {
    lucchettoChiusocinque.style.display = "flex";
    lucchettoApertocinque.style.display = "none";
}

const blocchi = [
    document.getElementById("prima"),
    document.getElementById("seconda"),
    document.getElementById("terza"),
    document.getElementById("quarta"),
    document.getElementById("quinta")
];

const generaButton = document.getElementById("generate");

let cooldown = false;
let undoStack = [];
let redoStack = [];

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function isColorLight(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance >= 128;
}

function aggiornaColore(elemento, colore) {
    elemento.style.backgroundColor = colore;
    const coloreTesto = isColorLight(colore) ? "#000000" : "#FFFFFF";

    const icone = elemento.querySelectorAll("i");
    icone.forEach(icon => {
        icon.style.color = coloreTesto;
    });
}

// Salva lo stato attuale dei colori
function salvaStato(stack) {
    const stato = blocchi.map(blocco => blocco.style.backgroundColor);
    stack.push(stato);
}

// Applica uno stato salvato
function applicaStato(stato) {
    blocchi.forEach((blocco, index) => {
        aggiornaColore(blocco, stato[index]);
    });
}

// Nuova funzione che gestisce la logica per generare colori
function generateColors() {
    salvaStato(undoStack); // Salva prima di cambiare
    redoStack = []; // Puliamo redo

    blocchi.forEach(blocco => {
        const colore = getRandomColor();
        aggiornaColore(blocco, colore);
    });

    cooldown = true;
    setTimeout(() => {
        cooldown = false;
    }, 500);
}

generaButton.addEventListener("click", () => {
    if (!cooldown) {
        generateColors();
    }
});

document.addEventListener("keydown", function (event) {
    // SPACE = cambia colori
    if (event.code === "Space" && !cooldown) {
        salvaStato(undoStack); // Salva prima di cambiare
        redoStack = []; // Puliamo redo

        blocchi.forEach(blocco => {
            const colore = getRandomColor();
            aggiornaColore(blocco, colore);
        });

        cooldown = true;
        setTimeout(() => {
            cooldown = false;
        }, 500);
    }

    // CTRL+Z = UNDO
    if (event.ctrlKey && event.key === "z") {
        if (undoStack.length > 0) {
            salvaStato(redoStack); // Salva stato attuale in redo
            const ultimo = undoStack.pop();
            applicaStato(ultimo);
        }
    }

    // CTRL+Y = REDO
    if (event.ctrlKey && event.key === "y") {
        if (redoStack.length > 0) {
            salvaStato(undoStack); // Salva stato attuale in undo
            const prossimo = redoStack.pop();
            applicaStato(prossimo);
        }
    }

    // Selettori dei bottoni
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

// Funzioni collegate ai bottoni
undoBtn.addEventListener("click", () => {
    if (undoStack.length > 0) {
        salvaStato(redoStack);
        const ultimo = undoStack.pop();
        applicaStato(ultimo);
    }
});

redoBtn.addEventListener("click", () => {
    if (redoStack.length > 0) {
        salvaStato(undoStack);
        const prossimo = redoStack.pop();
        applicaStato(prossimo);
    }
});

// Funzione per convertire RGB in HEX
function rgbToHex(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match) return rgb;
    return (
        "#" +
        match
            .map((x) => parseInt(x).toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
    );
}

// Seleziona tutte le icone "fa-copy"
const iconeCopy = document.querySelectorAll(".fa-copy");

// Per ogni icona, aggiungi il comportamento di copia
iconeCopy.forEach(icon => {
    icon.addEventListener("click", () => {
        const blocco = icon.closest("span"); // risale al contenitore
        const colore = blocco.style.backgroundColor;
        const hex = rgbToHex(colore);

        navigator.clipboard.writeText(hex)
    });
});
});

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

function registra() {
    window.location.href = "registrazione.html";
}

function login() {
    window.location.href = "login.html";
}