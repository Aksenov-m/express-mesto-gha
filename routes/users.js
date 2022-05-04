// создадим express router
const regex = /((https?:):\/\/)?[a-z0-9./?:@\-_=#]+\.([a-z0-9&./?:@\-_=#])*/i;
const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();

const {
  getUsers,
  // createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users'); // импортируем user контроллеры

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser); // информацию о текущем пользователе
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser); // обновляет профиль
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
}), updateUserAvatar); // обновляет аватар

// экспортируем его
module.exports = userRouter;
