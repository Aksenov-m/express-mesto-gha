const user = require("../models/user.js");

// возвращает всех пользователей
const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

// возвращает пользователя по _id
const getUserById = (req, res, next) => {
  if (!users[req.params._id]) {
    res.send({ error: "Такого пользователя нет" });
    // не забудем выйти из функции
    return;
  }
  next(); // вызываем next
};

// создаёт пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  user
    .create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
};
