// Подключение к Telegram Web App API для вывода логина пользователя
const telegramUser = window.Telegram.WebApp;
function setTelegramNick() {
  const nickElement = document.getElementById('nick');
  nickElement.textContent = telegramUser.initDataUnsafe.user.username;
}
document.addEventListener('DOMContentLoaded', () => {
  setTelegramNick();
  loadGame(); // Загрузка сохраненного прогресса при загрузке страницы
});

// Переменные
let bread = 0;
let clickValue = 1;
let level = 1;
const levelThresholds = [0, 1, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 1000000000];
const levelDisplay = document.getElementById('levelDisplay');
const progressBar = document.getElementById('progressBar');
const breadCounter = document.getElementById('breadCounter');
const clickIncome = document.getElementById('clickIncome');

// Загрузка игры
function loadGame() {
  // Проверка наличия сохраненных данных
  if (localStorage.getItem('bread')) {
    bread = parseInt(localStorage.getItem('bread'), 10);
    clickValue = parseInt(localStorage.getItem('clickValue'), 10);
    level = parseInt(localStorage.getItem('level'), 10);
  }
  // Обновление интерфейса
  breadCounter.textContent = 'Bread: ' + bread;
  levelDisplay.textContent = level;
  clickIncome.textContent = 'Монет за клик: ' + clickValue;
  updateProgressBar();
}

// Сохранение игры
function saveGame() {
  localStorage.setItem('bread', bread);
  localStorage.setItem('clickValue', clickValue);
  localStorage.setItem('level', level);
}

// Начисление монет за клик
function clickBread() {
  bread += clickValue;
  breadCounter.textContent = 'Bread: ' + bread;
  saveGame(); // Сохранение прогресса после каждого клика
  checkLevelUp();
}

// Проверка повышения уровня
function checkLevelUp() {
  while (bread >= levelThresholds[level]) {
    level++;
    clickValue += 2;
    levelDisplay.textContent = level;
    clickIncome.textContent = 'Монет за клик: ' + clickValue;
    updateProgressBar();
    saveGame(); // Сохранение прогресса при повышении уровня
  }
}

// Обновление прогрессбара
function updateProgressBar() {
  let progress = (bread - levelThresholds[level - 1]) / (levelThresholds[level] - levelThresholds[level - 1]) * 100;
  progressBar.style.width = progress + '%';
}

// Добавьте обработчик события для сохранения игры перед закрытием страницы
window.onbeforeunload = saveGame;
