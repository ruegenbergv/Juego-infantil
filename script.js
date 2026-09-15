// app.js

// ---------- ELEMENTOS ----------
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const celebrationScreen = document.getElementById('celebration-screen');

const startBtn = document.getElementById('start-btn');
const homeBtn = document.getElementById('home-btn');
const checkBtn = document.getElementById('check-btn');
const againBtn = document.getElementById('again-btn');

const objectsContainer = document.getElementById('objects-container');
const numbersContainer = document.getElementById('numbers-container');
const feedbackMsg = document.getElementById('feedback-msg');
const animalsContainer = document.getElementById('animals-container');

// ---------- DATOS ----------
const OBJETOS = ['🍎', '🌟', '🎈', '🐟', '🍓', '🌼', '🍪', '🚗'];
const ANIMALES = ['🐰', '🐥', '🐶', '🐱', '🦋', '🐸', '🐻', '🐼'];

let numeroCorrecto = null;
let numeroSeleccionado = null;

// ---------- NAVEGACIÓN ----------
function mostrarPantalla(pantalla) {
  [startScreen, gameScreen, celebrationScreen].forEach(s => s.classList.add('hidden'));
  pantalla.classList.remove('hidden');
}

startBtn.addEventListener('click', () => {
  mostrarPantalla(gameScreen);
  nuevaRonda();
});

homeBtn.addEventListener('click', () => {
  mostrarPantalla(startScreen);
});

againBtn.addEventListener('click', () => {
  mostrarPantalla(gameScreen);
  nuevaRonda();
});

// ---------- LÓGICA DEL JUEGO ----------
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nuevaRonda() {
  numeroSeleccionado = null;
  feedbackMsg.textContent = '';
  feedbackMsg.classList.remove('wrong');
  checkBtn.classList.add('hidden');

  numeroCorrecto = numeroAleatorio(1, 10);
  const emoji = OBJETOS[Math.floor(Math.random() * OBJETOS.length)];

  renderObjetos(numeroCorrecto, emoji);
  renderNumeros();
}

function renderObjetos(cantidad, emoji) {
  objectsContainer.innerHTML = '';
  for (let i = 0; i < cantidad; i++) {
    const span = document.createElement('span');
    span.textContent = emoji;
    objectsContainer.appendChild(span);
  }
}

function renderNumeros() {
  numbersContainer.innerHTML = '';
  for (let n = 1; n <= 10; n++) {
    const btn = document.createElement('button');
    btn.textContent = n;
    btn.className = 'number-btn';
    btn.addEventListener('click', () => seleccionarNumero(n, btn));
    numbersContainer.appendChild(btn);
  }
}

function seleccionarNumero(numero, btn) {
  const botones = document.querySelectorAll('.number-btn');

  if (numeroSeleccionado === numero) {
    // Deseleccionar si vuelve a tocar el mismo número
    numeroSeleccionado = null;
    btn.classList.remove('selected');
    checkBtn.classList.add('hidden');
  } else {
    // Selecciona uno nuevo (quita selección previa)
    botones.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    numeroSeleccionado = numero;
    checkBtn.classList.remove('hidden');
  }

  feedbackMsg.textContent = '';
  feedbackMsg.classList.remove('wrong');
}

checkBtn.addEventListener('click', () => {
  if (numeroSeleccionado === null) return;

  if (numeroSeleccionado === numeroCorrecto) {
    celebrar();
  } else {
    feedbackMsg.textContent = '¡Intenta de nuevo! 💙';
    feedbackMsg.classList.add('wrong');
  }
});

// ---------- CELEBRACIÓN ----------
function celebrar() {
  animalsContainer.innerHTML = '';

  const cantidadAnimales = 8;
  for (let i = 0; i < cantidadAnimales; i++) {
    const span = document.createElement('span');
    span.textContent = ANIMALES[Math.floor(Math.random() * ANIMALES.length)];
    span.style.left = Math.random() * 85 + '%';
    span.style.top = Math.random() * 70 + '%';
    span.style.animationDelay = (Math.random() * 1.2) + 's';
    animalsContainer.appendChild(span);
  }

  mostrarPantalla(celebrationScreen);
}
