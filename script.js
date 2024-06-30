// Подключение к Telegram Web App API для вывода логина пользователя
const telegramUser = window.Telegram.WebApp;
function setTelegramNick() {
  const nickElement = document.getElementById('nick');
  nickElement.textContent = telegramUser.initDataUnsafe.user.username;
}

// Переменные
let bread = 0;
let clickValue = 1;
let level = 1;
let batyacoin = 0;
const levelThresholds = [0, 1, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 1000000000];
const levelDisplay = document.getElementById('levelDisplay');
const progressBar = document.getElementById('progressBar');
const breadCounter = document.getElementById('breadCounter');
const clickIncome = document.getElementById('clickIncome');
const clickcoin = document.getElementById('clickcoin');


function convertBreadToTokens() {
  clickcoin += Math.floor(bread / 1000); // Добавляем токены за каждые 1000 монет
  bread %= 1000; // Обновляем количество монет, убирая "использованные" для конвертации
  // Обновление интерфейса
  document.getElementById('breadCounter').textContent = 'Bread: ' + bread;
  document.getElementById('clickcoin').textContent = clickcoin;
}
// Начисление монет за клик
function clickBread() {
  bread += clickValue;
  breadCounter.textContent = 'Bread: ' + bread;
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
  }
}

// Обновление прогрессбара
function updateProgressBar() {
  let progress = (bread - levelThresholds[level - 1]) / (levelThresholds[level] - levelThresholds[level - 1]) * 100;
  progressBar.style.width = progress + '%';
}

function saveGame() {
  // Сохраняем локально
  localStorage.setItem('bread', bread);
  localStorage.setItem('clickValue', clickValue);
  localStorage.setItem('level', level);

  // Отправляем данные на сервер для сохранения в SQLite
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nick: telegramUser.initDataUnsafe.user.username, // Используем логин пользователя из Telegram
      bread: bread,
      clickcoin: clickcoin,
      lvl: level
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Сохранение успешно:', data);
  })
  .catch((error) => {
    console.error('Ошибка при сохранении:', error);
  });
}

// Загрузка игры
function loadGame() {
  // Загружаем локально сохраненные данные, если они есть
  if (localStorage.getItem('bread')) {
    bread = parseInt(localStorage.getItem('bread'), 10);
    clickValue = parseInt(localStorage.getItem('clickValue'), 10);
    level = parseInt(localStorage.getItem('level'), 10);
  }

  // Запрашиваем данные с сервера
  fetch(`/load/${telegramUser.initDataUnsafe.user.username}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        bread = data.bread;
        clickcoin = data.clickcoin;
        level = data.lvl;
        // Обновляем интерфейс с загруженными данными
        breadCounter.textContent = 'Bread: ' + bread;
        levelDisplay.textContent = level;
        clickIncome.textContent = 'Монет за клик: ' + clickValue;
        updateProgressBar();
      }
    })
    .catch((error) => {
      console.error('Ошибка при загрузке данных:', error);
    });
}
