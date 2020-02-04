const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Controller = require('../controllers/dares');

router.get("/", checkAuth, Controller.get_all);

router.get("/:id", Controller.get_one);

router.post("/", checkAuth, Controller.create);

router.patch("/:id", checkAuth, Controller.update);

router.delete("/:id", checkAuth, Controller.delete);

module.exports = router;
