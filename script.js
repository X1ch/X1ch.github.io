// Подключение к Telegram Web App API
const telegramUser = window.Telegram.WebApp;
function setTelegramNick() {
  const nickElement = document.getElementById('nick');
  nickElement.textContent = telegramUser.initDataUnsafe.user.username;
}
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







// Замените 'ACCESS_TOKEN' и 'FILE_PATH' на ваши данные
const yandexDiskApiUrl = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const accessToken = 'y0_AgAAAABjbR8fAAwGDAAAAAEI212pAADoMAuef5dEIpvPIVEhdxoUSfJQMw';
const filePath = 'disk%2FBreadFather.xlsx';

function uploadDataToYandexDisk(data) {
  // Получение ссылки для загрузки файла
  fetch(yandexDiskApiUrl + '?path=' + encodeURIComponent(filePath), {
    method: 'GET',
    headers: {
      'Authorization': `OAuth ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(uploadUrl => {
    // Загрузка данных на Yandex Disk
    fetch(uploadUrl.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      body: data // Данные в формате Blob или ArrayBuffer
    })
    .then(response => {
      if (response.status === 201) {
        console.log('Data uploaded successfully');
      }
    })
    .catch(error => console.error('Upload failed:', error));
  })
  .catch(error => console.error('Error getting upload link:', error));
}