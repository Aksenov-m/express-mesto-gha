// создадим express router
const userRouter = require("express").Router();
const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  sendUser,
} = require("../controllers/users.js"); // импортируем user контроллеры

userRouter.get("/users", express.json(), getUsers);
userRouter.post("/users", express.json(), createUser);
userRouter.get("/users/:userId", getUserById);

// экспортируем его
module.exports = userRouter;
