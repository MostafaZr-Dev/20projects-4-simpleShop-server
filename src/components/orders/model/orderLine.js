const mongoose = require("mongoose");
const { Schema } = mongoose;

exports.OrderLineSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Products" },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
