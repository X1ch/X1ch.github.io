let tg = window.Telegram.WebApp;

tg.expand();

let bread = 0;
let batya = 0;
let level = 1;
let reward = 1;
const levels = [1, 5, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 1000000000];

function earnBread(event) {
  bread += reward;
  document.getElementById('bread-counter').textContent = 'Bread: ' + bread;
  document.getElementById('click-income').textContent = 'Доход за клик: ' + reward;
  showClickReward(event);
  updateLevel();
}

function showClickReward(event) {
  const rewardDisplay = document.createElement('div');
  rewardDisplay.classList.add('click-reward-display');
  rewardDisplay.textContent = '+' + reward;
  document.body.appendChild(rewardDisplay);
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  rewardDisplay.style.left = x + 'px';
  rewardDisplay.style.top = y - 30 + 'px';
  setTimeout(() => {
    rewardDisplay.style.opacity = 1;
    rewardDisplay.style.top = y - 60 + 'px';
    setTimeout(() => {
      rewardDisplay.remove();
    }, 500);
  }, 10);
}

function updateLevel() {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (bread >= levels[i]) {
      level = i + 1;
      reward = 2 * level;
      break;
    }
  }
  document.getElementById('level-info').textContent = 'Уровень: ' + level;
  let progress = ((bread - (levels[level - 2] || 0)) / (levels[level - 1] - (levels[level - 2] || 0))) * 100;
  document.getElementById('level-progress-bar').style.width = progress + '%';
}