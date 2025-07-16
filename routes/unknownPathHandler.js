const express = require("express");
const router = express.Router();

const { handler404 } = require("../controllers/errorController");
router.use(handler404);

module.exports = router;
