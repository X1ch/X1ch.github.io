function convertBread() {
    // Предположим, что конверсия 1000 bread в 1 batya
    batya += Math.floor(bread / 1000);
    bread %= 1000;
    document.getElementById('batya-counter').textContent = 'Batya: ' + batya;
    document.getElementById('bread-counter').textContent = 'Bread: ' + bread;
  }
  
  // Добавьте эту функцию в ваш index.html
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('batya-counter').textContent = 'Batya: ' + batya;
    document.getElementById('bread-counter').textContent = 'Bread: ' + bread;
  });