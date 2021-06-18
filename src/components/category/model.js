const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const CategorySchema = new Schema({
  title: String,
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = {
  CategoryModel: Category,
  CategorySchema,
};
