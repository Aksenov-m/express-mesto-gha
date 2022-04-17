// создадим express router
const cardRouter = require("express").Router();
const express = require("express");
const {
  getCards,
  createCard,
  delCardsById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js"); // импортируем user контроллеры

cardRouter.get("/cards", express.json(), getCards); // возвращает все карточки
cardRouter.post("/cards", createCard); // создаёт карточку
cardRouter.delete("/cards/:cardId", delCardsById); // удаляет карточку по идентификатору
cardRouter.put("/cards/:cardId/likes", likeCard); //поставить лайк карточке
cardRouter.delete("/cards/:cardId/likes", dislikeCard); //убрать лайк с карточки

// экспортируем его
module.exports = cardRouter;
