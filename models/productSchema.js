const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("product", productSchema);

const validateProduct = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    url: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = { Products, validateProduct };
