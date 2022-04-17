const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // имя карточки — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String, // имя — это строка
    required: true, // обязательное поле
    ref: "link",
  },
  owner: {
    type: mongoose.Types.ObjectId, // ссылка на модель автора карточки
    required: true, // обязательное поле
    ref: "owner",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId, // ссылка на модель автора карточки
      default: [], // пустой массив
    },
  ],
  createdAt: {
    type: Date, // дата создания
    default: Date.now(),
  },
});
// создаём модель и экспортируем её
module.exports = mongoose.model("card", cardSchema);
