const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderStatus = require("./orderStatus");
const { OrderLineSchema } = require("./orderLine");

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  totalPrice: { type: Number, required: true },
  status: { type: Number, default: orderStatus.UNPAID },
  orderLine: { type: [OrderLineSchema] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
