const express = require("express");
const router = express.Router();

const {
  getHome,
  contactUs,
  getFavorites,
  getIndexHomelist,
  getHomeWithId,
  addToFavorites,
  removeFromFavorites,
} = require("../controllers/userController");
router.get("/", getIndexHomelist);
router.get("/contact-us", contactUs);
router.get("/all-homelist", getHome);
router.get("/homes/:home_id", getHomeWithId);
router.post("/favorites/:home_id", addToFavorites);
router.post("/favorites/remove/:home_id", removeFromFavorites);
router.get("/favorites", getFavorites);
module.exports = router;
