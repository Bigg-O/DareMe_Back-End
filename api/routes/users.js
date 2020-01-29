const express = require("express");
const router = express.Router();
const Controller = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.get("/", Controller.get_all);

router.post("/signup", Controller.signup);

router.post("/login", Controller.login);

router.delete("/:id", checkAuth, Controller.delete);

module.exports = router;
