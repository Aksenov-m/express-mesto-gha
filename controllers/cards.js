const Card = require("../models/card.js");

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
          .status(400)
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

// возвращает всех карточки
const delCardsById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
  createCard,
  getCards,
  delCardsById,
};
