const express = require("express");
const multer = require("multer");
const {
  uploadCSV,
  getFilteredProducts,
  getGroupedByOption,
  resetProducts, 
} = require("../controllers/productController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/filters", getFilteredProducts);
router.get("/grouped", getGroupedByOption);
router.delete("/reset", resetProducts);

module.exports = router;
