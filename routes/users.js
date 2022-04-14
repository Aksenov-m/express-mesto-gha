// создадим express router
const userRouter = require("express").Router();
const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
} = require("../controllers/users.js"); // импортируем user контроллеры

userRouter.get("/users", getUsers);
userRouter.get("/users/:userId", getUserById);
userRouter.post("/users", express.json(), createUser);

// экспортируем его
module.exports = userRouter;
