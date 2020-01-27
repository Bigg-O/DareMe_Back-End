const express = require("express");
const router = express.Router();
const controller = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.get("/", controller.get_all);

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.delete("/:id", checkAuth, controller.user_delete);

module.exports = router;
