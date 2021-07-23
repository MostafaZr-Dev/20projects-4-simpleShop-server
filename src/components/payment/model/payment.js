const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentStatus = require("./paymentStatus");

const PaymentSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "Orders" },
  method: { type: String, required: true },
  gateway: { type: String },
  reserve: { type: String, unique: true },
  refrence: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date, default: "" },
  status: { type: Number, default: paymentStatus.PENDING },
});

const Orders = mongoose.model("Payments", PaymentSchema);

module.exports = Orders;
