const express = require("express");
const router = express.Router();

// const db = require("../Helper/db");
const userMiddleware = require("../Middleware/Users");
const authController = require("../Controllers/Auth");
// const usersController = require("../Controllers/Users");

router.post(
  "/sign-up",
  userMiddleware.validateRegister,
  authController.register
);

router.route("/login").post(authController.login);

// router.get("/users", usersController.getUsers);

// router.post("/users", userMiddleware.isAdmin, usersController.addUsers);

// router.patch("/users/:id", userMiddleware.isAdmin, usersController.updateUsers);

// router.delete("/users/:id", userMiddleware.isAdmin, usersController.deleteUsers)


module.exports = router;
