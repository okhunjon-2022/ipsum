const express = require("express");
const router = express.Router();
const { Products, validateProduct } = require("../models/productSchema");

router.get("/", async (req, res) => {
  try {
    let products = await Products.find();
    res.json(products);
  } catch {
    res.json("server error");
  }
});

router.post("/", async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }
    let { title, price, category, url } = req.body;
    let newPro = await Products.create({ title, price, category, url });
    let savePro = await newPro.save();
    res.json(savePro);
  } catch {
    res.json("server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletePro = await Products.findByIdAndRemove(id);
    res.json("uchirildi");
  } catch {
    res.json("server error ");
  }
});

router.put("/:proID", async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }
    let { proID } = req.params;
    let updatePro = await Products.findByIdAndUpdate(proID, req.body);
    res.json("Ozgartirildi");
  } catch {
    res.json("server error");
  }
});

module.exports = router;
