require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
app.use(express.json()); //middleware used to transmit data from req.body

//route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>STORE API</h1>`);
});

//api-arch...
app.use("/api/v1/products", productsRouter);
//product route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log("Server is started");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
