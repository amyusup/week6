const express = require("express");
const router = express.Router();

// const db = require("../Helper/db");
const userMiddleware = require("../Middleware/Users");
// const authController = require("../Controllers/Auth");
const usersController = require("../Controllers/Users");

// router.post(
//   "/sign-up",
//   userMiddleware.validateRegister,
//   authController.register
// );

// router.route("/login").post(authController.login);

router.get("/", usersController.getUsers);

router.post("/", userMiddleware.isAdmin, usersController.addUsers);

router.patch("/:id", userMiddleware.isAdmin, usersController.updateUsers);

router.delete("/:id", userMiddleware.isAdmin, usersController.deleteUsers)


module.exports = router;
