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
    document.getElementById('clickIncome').textContent = 'Доход за клик: ' + clickValue;
    updateProgressBar();
  }
}

function updateProgressBar() {
  let progress = (bread - levelThresholds[level - 1]) / (levelThresholds[level] - levelThresholds[level - 1]) * 100;
  progressBar.style.width = progress + '%';
}
