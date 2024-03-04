const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Product should have a name"],
  },
  price: {
    type: Number,
    required: [true, "A Product should have a price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: ["ikea", "liddy", "caressa", "marcos"],
  },
});