const regex = /((https?:):\/\/)?[a-z0-9./?:@\-_=#]+\.([a-z0-9&./?:@\-_=#])*/i;
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');
const userRouter = require('./routes/users'); // импортируем роутер user
const cardRouter = require('./routes/cards'); // импортируем роутер Card
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

const {
  login,
  createUser,
} = require('./controllers/users'); // импортируем user контроллеры

// Слушаем 3000 портex
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json()); // для собирания JSON-формата
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// авторизация
app.use(auth);
app.use(cardRouter); // запускаем Card
app.use(userRouter); // запускаем user
app.use((req, res, next) => {
  next(new NotFoundError('Роутер не найден!'));
});
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
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
