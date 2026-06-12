let currentLang = localStorage.getItem('lang') || 'pt';
let translations = {};

// Carrega as traduções
async function loadTranslations(lang) {
    const res = await fetch(`lang/${lang}.json`);
    translations = await res.json();
    applyTranslations();
    updateLangBtn();
}

// Aplica traduções a todos os elementos com data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.innerHTML = translations[key];
        }
    });
    // Guarda preferência
    localStorage.setItem('lang', currentLang);
    document.documentElement.lang = currentLang;
}

// Alterna idioma
function toggleLang() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    loadTranslations(currentLang);
}

// Atualiza botão de idioma
function updateLangBtn() {
    const ptOption = document.querySelector('.lang-btn .pt-option');
    const enOption = document.querySelector('.lang-btn .en-option');
    
    if (currentLang === 'pt') {
        ptOption.classList.add('active');
        enOption.classList.remove('active');
    } else {
        enOption.classList.add('active');
        ptOption.classList.remove('active');
    }
}

// Hamburger menu
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    const btn = document.querySelector('.hamburger');
    nav.classList.toggle('open');
    btn.classList.toggle('open');
}

// Fecha menu ao clicar num link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('open');
        document.querySelector('.hamburger').classList.remove('open');
    });
});

// Inicia
loadTranslations(currentLang);