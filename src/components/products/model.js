const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const GallerySchema = new Schema({
  id: ObjectId,
  path: String,
});

const ProductsSchema = new Schema({
  title: String,
  thumbnail: String,
  gallery: [GallerySchema],
  price: Number,
  discountedPrice: Number,
  count: Number,
  soldCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductsSchema.set("toObject", { virtuals: true });
ProductsSchema.set("toJSON", { virtuals: true });

ProductsSchema.virtual("thumbnailUrl").get(function () {
  const fileName = this.thumbnail.split("/").pop();
  const appUrl = process.env.APP_URL;
  const mediaPath = "uploads/media";

  return `${appUrl}/${mediaPath}/thumbnail-${fileName}`;
});

ProductsSchema.virtual("galleryUrls").get(function () {
  const appUrl = process.env.APP_URL;
  const mediaPath = "uploads/media";

  return this.gallery.map((image) => {
    const fileName = image.path.split("/").pop();

    return {
      id: image._id,
      path: `${appUrl}/${mediaPath}/gallery-${fileName}`,
    };
  });
});

const Product = mongoose.model("Products", ProductsSchema);

module.exports = Product;
