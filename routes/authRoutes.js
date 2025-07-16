const express = require("express");
const router = express.Router();

const {
  loginPage,
  postLogin,
  registerPage,
  postRegister,
  logout,
} = require("../controllers/authController");

router.get("/login", loginPage);
router.post("/login", postLogin);
router.get("/register", registerPage);
router.post("/register", postRegister);
router.get("/logout", logout);

module.exports = router;
