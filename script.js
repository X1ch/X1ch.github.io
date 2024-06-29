// Подключение к Telegram Web App API
const telegramUser = window.Telegram.WebApp;

// Функция для установки ника пользователя
function setTelegramNick() {
  // Получение элемента по ID
  const nickElement = document.getElementById('nick');
  
  // Установка ника пользователя в элемент
  nickElement.textContent = telegramUser.initDataUnsafe.user.username;
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', setTelegramNick);

let bread = 0;
let clickValue = 1;
let level = 1;
const levelThresholds = [0, 1, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 1000000000];
const levelDisplay = document.getElementById('levelDisplay');
const progressBar = document.getElementById('progressBar');

function clickBread() {
  bread += clickValue;
  document.getElementById('breadCounter').textContent = 'Bread: ' + bread;
  checkLevelUp();
}

function checkLevelUp() {
  if (bread >= levelThresholds[level]) {
    level++;
    clickValue += 2;
    levelDisplay.textContent = level;
    document.getElementById('clickIncome').textContent = 'Монет за клик: ' + clickValue;
    updateProgressBar();
  }
}

function updateProgressBar() {
  let progress = (bread - levelThresholds[level - 1]) / (levelThresholds[level] - levelThresholds[level - 1]) * 100;
  progressBar.style.width = progress + '%';
}







const googleSheetsApiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append';
const accessToken = '1015207639462'; // Замените на ваш access_token
const spreadsheetId = '1RjxE-TzCStnvucWt8Hy2aUOj22oKjFPC0P5jsgMLMiE'; // Замените на ID вашей таблицы
const range = 'A1'; // Диапазон ячеек для добавления данных

function appendDataToSheet(data) {
  fetch(googleSheetsApiUrl.replace('{spreadsheetId}', spreadsheetId).replace('{range}', range), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [data],
      majorDimension: 'ROWS'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data appended:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Пример использования
appendDataToSheet(['User123', bread, clickValue, level]);
