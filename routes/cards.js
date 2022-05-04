// создадим express router
const regex = /((https?:):\/\/)?[a-z0-9./?:@\-_=#]+\.([a-z0-9&./?:@\-_=#])*/i;
const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards'); // импортируем user контроллеры

cardRouter.get('/cards', getCards); // возвращает все карточки
cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(regex),
  }),
}), createCard); // создаёт карточку
cardRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard); // удаляет карточку по идентификатору
cardRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard); // поставить лайк карточке
cardRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard); // убрать лайк с карточки

// экспортируем его
module.exports = cardRouter;
