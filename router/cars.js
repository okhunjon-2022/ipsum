const express = require("express");
const router = express.Router();
const { Cars, validateCar } = require("../models/carSchema");

router.get("/", async (req, res) => {
  try {
    let cars = await Cars.find();
    res.json(cars);
  } catch {
    res.json("smth is went wrong");
  }
});

router.post("/", async (req, res) => {
  try {
    let { error } = validateCar(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }
    let { name, brand, price, year, url } = req.body;
    let newCar = await Cars.create({ name, brand, price, year, url });
    let saveCar = await newCar.save();
    res.json(saveCar);
  } catch {
    res.json("smth is went wrong");
  }
});

router.delete("/:carID", async (req, res) => {
  try {
    let { carID } = req.params;
    let removeCar = await Cars.findByIdAndDelete(carID);
    res.json("deleted");
  } catch {
    res.json("smth is went wrong");
  }
});

router.put("/:carId", async (req, res) => {
  try {
    let { error } = validateCar(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }
    let { carId } = req.params;
    let newCAR = await Cars.findByIdAndUpdate(carId, req.body);
    res.json("updated");
  } catch {
    res.json("smth is went wrong");
  }
});

module.exports = router;
