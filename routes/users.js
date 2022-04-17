// создадим express router
const userRouter = require("express").Router();
const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users.js"); // импортируем user контроллеры

userRouter.get("/users", express.json(), getUsers);
userRouter.post("/users", express.json(), createUser);
userRouter.get("/users/:userId", getUserById);
userRouter.patch("/users/me", updateUser); //обновляет профиль
userRouter.patch("/users/me/avatar", updateUserAvatar); //обновляет аватар

// экспортируем его
module.exports = userRouter;
