const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: [Object] },
  zipcode: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
