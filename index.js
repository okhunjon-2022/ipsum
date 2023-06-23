const express = require("express");
const app = express();
const { config } = require("dotenv");
const mongoose = require("mongoose");

config();
app.use(express.json());

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGODB)
  .then((res) => console.log("MongoDB is connented"))
  .catch((err) => console.log("MongoDB is not connected"));

app.get("/", async (req, res) => {
  //res.send -> res.json()
  res.json("mongo db");
});
//  routers
const Products = require("./router/products");
const Cars = require("./router/cars");
app.use("/products", Products);
app.use("/cars", Cars);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`${PORT} is listened`));
