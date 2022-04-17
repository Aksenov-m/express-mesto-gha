// const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.js"); // импортируем роутер user
const cardRouter = require("./routes/cards.js"); // импортируем роутер Card
const path = require("path");

// Слушаем 3000 портex
const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "6259c2e21ef536d927e90d41", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json()); // для собирания JSON-формата
app.use(userRouter); // запускаем user
app.use(cardRouter); // запускаем Card

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
