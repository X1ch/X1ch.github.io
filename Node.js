const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Поддержка JSON-encoded тел запросов
app.use(bodyParser.urlencoded({ extended: true })); // Поддержка URL-encoded тел запросов

// Подключение к базе данных SQLite
const db = new sqlite3.Database('game.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Ошибка при подключении к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nick VARCHAR(50),
      bread INTEGER,
      clickcoin INTEGER,
      lvl INTEGER
    )`);
  }
});

// Маршрут для сохранения игры
app.post('/save', (req, res) => {
  const { nick, bread, clickcoin, lvl } = req.body;
  db.run('INSERT INTO users (nick, bread, clickcoin, lvl) VALUES (?, ?, ?, ?)', [nick, bread, clickcoin, lvl], function(err) {
    if (err) {
      res.status(500).send({ error: 'Ошибка при сохранении данных' });
    } else {
      res.send({ message: 'Данные успешно сохранены', id: this.lastID });
    }
  });
});

// Маршрут для загрузки игры
app.get('/load/:nick', (req, res) => {
  const nick = req.params.nick;
  db.get('SELECT * FROM users WHERE nick = ?', [nick], (err, row) => {
    if (err) {
      res.status(500).send({ error: 'Ошибка при загрузке данных' });
    } else {
      res.send(row);
    }
  });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}.`);
});