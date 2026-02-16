// 🌙 Dark Mode - Funciona em todas as páginas
function initializeDarkMode() {
    const switchModo = document.getElementById("modoSwitch");
    if (!switchModo) return; // Se não houver switch, não faz nada
    
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    if (savedDarkMode) {
        switchModo.checked = true;
        applyDarkMode(true);
    }

    switchModo.addEventListener("change", function () {
        localStorage.setItem("darkMode", this.checked);
        applyDarkMode(this.checked);
    });
}

function applyDarkMode(isDark) {
    if (isDark) {
        // Fundo e texto
        document.documentElement.style.setProperty('--cor-fundo', '#121212');
        document.documentElement.style.setProperty('--cor-texto', '#ffffff');
        // Cards
        document.documentElement.style.setProperty('--cor-card', '#1e1e1e');
        document.documentElement.style.setProperty('--cor-card-texto', '#ffffff');
        document.documentElement.style.setProperty('--cor-card-border', '#333333');
    } else {
        // Fundo e texto
        document.documentElement.style.setProperty('--cor-fundo', '#ffffff');
        document.documentElement.style.setProperty('--cor-texto', '#000000');
        // Cards
        document.documentElement.style.setProperty('--cor-card', '#ffffff');
        document.documentElement.style.setProperty('--cor-card-texto', '#000000');
        document.documentElement.style.setProperty('--cor-card-border', '#dee2e6');
    }
}

// Inicializa dark mode quando o DOM está pronto
document.addEventListener("DOMContentLoaded", initializeDarkMode);
