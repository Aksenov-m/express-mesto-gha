// создадим express router
const cardRouter = require("express").Router();
const express = require("express");
const {
  getCards,
  createCard,
  delCardsById,
  // isLikedCards,
  // delLikedCards,
} = require("../controllers/cards.js"); // импортируем user контроллеры

cardRouter.get("/cards", express.json(), getCards); // возвращает все карточки
cardRouter.post("/cards", createCard); // создаёт карточку
cardRouter.delete("/cards/:cardId", delCardsById); // удаляет карточку по идентификатору
// userRouter.put("/cards/:cardId/likes", isLikedCards); //поставить лайк карточке
// userRouter.delete("/cards/:cardId/likes", delLikedCards); //убрать лайк с карточки

// экспортируем его
module.exports = cardRouter;
