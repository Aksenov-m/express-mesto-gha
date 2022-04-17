const User = require("../models/user.js");

// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

// возвращает всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

// возвращает пользователя по _id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ message: "Такого пользователя не существует" })
    );
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send({ name: user.name, about: user.about }))
    .catch((err) =>
      res.status(500).send({
        message:
          "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое",
      })
    );
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) =>
      res.status(500).send({
        message:
          "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое",
      })
    );
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
};