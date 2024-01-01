const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema({
  price: {
    type: String,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Phone", PhoneSchema);
