const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const controller = require('../controllers/dares');

router.get("/", controller.get_all);

router.get("/:id", controller.get_one);

router.post("/", controller.create);

router.patch("/:id", checkAuth, controller.update);

router.delete("/:id", checkAuth, controller.delete);

module.exports = router;
