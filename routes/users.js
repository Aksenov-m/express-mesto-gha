// создадим express router
const userRouter = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users'); // импортируем user контроллеры

userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/me', updateUser); // обновляет профиль
userRouter.patch('/users/me/avatar', updateUserAvatar); // обновляет аватар

// экспортируем его
module.exports = userRouter;
