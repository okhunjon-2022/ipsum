const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  url: {
    type: Array,
    required: true,
  },
});

const Cars = mongoose.model("cars", carSchema);

const validateCar = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    year: Joi.number().required(),
    url: Joi.array().required(),
  });
  return schema.validate(body);
};

module.exports = { Cars, validateCar };
