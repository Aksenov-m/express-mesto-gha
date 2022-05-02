// const bodyParser = require("body-parser");
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users'); // импортируем роутер user
const cardRouter = require('./routes/cards'); // импортируем роутер Card
const auth = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/users'); // импортируем user контроллеры

// Слушаем 3000 портex
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json()); // для собирания JSON-формата
app.post('/signin', login);
app.post('/signup', createUser);
// авторизация
app.use(auth);
app.use(cardRouter); // запускаем Card
app.use(userRouter); // запускаем user
app.use((req, res) => {
  res.status(404).send({ message: 'Роутер не найден!' });
});
app.use((err, req, res, next) => {
  debugger;
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
