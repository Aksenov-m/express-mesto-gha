const Card = require("../models/card.js");
const ERROR_CODE = 400;

// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) =>
      res.status(200).send({
        data: card,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Переданы некорректные данные карточки" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

// возвращает всех карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

// удаляет карточку
const delCardsById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card.data !== null) {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({
          message: "Карточка с указанным _id не найдена.",
        });
      } else {
        res.status(404).send({ message: "Произошла ошибка" });
      }
    });
};

// ставит лайк карточки
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: "Переданы некорректные данные для постановки лайка.",
        });
      } else if (err.name === "CastError") {
        res.status(404).send({
          message: "Передан несуществующий _id карточки.",
        });
      } else {
        res.status(500).send({
          message: "Произошла ошибка",
        });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: "Переданы некорректные данные для снятии лайка.",
        });
      } else if (err.name === "CastError") {
        res.status(404).send({
          message: "Передан несуществующий _id карточки.",
        });
      } else {
        res.status(500).send({
          message: "Произошла ошибка",
        });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  delCardsById,
  likeCard,
  dislikeCard,
};
