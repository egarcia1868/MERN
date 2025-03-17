const express = require("express");
const { getShow } = require("../controllers/showController");

const router = express.Router();

// GET all shows
router.get("/", (req, res) => {
  res.json({ mssg: "GET all shows" });
});

// GET a single show
router.get("/:id", getShow);

// POST a new show
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new show" });
});

// DELETE a show
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a show" });
});

// UPDATE a show
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a show" });
});

module.exports = router;
