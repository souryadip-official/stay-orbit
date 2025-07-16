const express = require("express");
const router = express.Router();

const {
  addHome,
  submitHome,
  getHostHomes,
  editHostHome,
  updateHostHome,
  deleteHostHome,
} = require("../controllers/hostController");
router.get("/add-home", addHome);
router.post("/submit-home", submitHome);
router.get("/home-lists", getHostHomes);
router.get("/edit-home/:home_id", editHostHome);
router.post("/update-home/:home_id", updateHostHome);
router.post("/delete-home/:home_id", deleteHostHome);

module.exports = router;
