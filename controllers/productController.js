const Product = require("../models/Product");
const csv = require("csv-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Upload CSV and insert into DB
exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let products = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        products.push({
          style_code: row.style_code,
          option_code: row.option_code,
          EAN_code: uuidv4(), // Generate unique EAN
          MRP: parseFloat(row.MRP),
          Brick: row.Brick,
          Sleeve: row.Sleeve,
        });
      })
      .on("end", async () => {
        await Product.insertMany(products);
        res.json({ message: "Products added successfully" });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter API
exports.getFilteredProducts = async (req, res) => {
  try {
    let filters = {};
    if (req.query.style_code) filters.style_code = req.query.style_code;
    if (req.query.option_code) filters.option_code = req.query.option_code;
    if (req.query.MRP) filters.MRP = req.query.MRP;
    if (req.query.Brick) filters.Brick = req.query.Brick;
    if (req.query.Sleeve) filters.Sleeve = req.query.Sleeve;

    const products = await Product.find(filters);
    const countByOption = await Product.aggregate([
      { $match: filters },
      { $group: { _id: "$option_code", count: { $sum: 1 } } },
    ]);

    res.json({ products, countByOption });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Group by 'option_code'
exports.getGroupedByOption = async (req, res) => {
  try {
    const filters = {};
    if (req.query.style_code) filters.style_code = req.query.style_code;
    if (req.query.option_code) filters.option_code = req.query.option_code;
    if (req.query.MRP) filters.MRP = req.query.MRP;
    if (req.query.Brick) filters.Brick = req.query.Brick;
    if (req.query.Sleeve) filters.Sleeve = req.query.Sleeve;

    const groupedData = await Product.aggregate([
      { $match: filters },
      { $group: { _id: "$option_code", products: { $push: "$$ROOT" } } },
    ]);

    res.json(groupedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset all products
exports.resetProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.json({ message: "All products deleted", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error resetting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
