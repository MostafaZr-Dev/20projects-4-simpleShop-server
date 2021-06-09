const productService = require("./services");
const transformProduct = require("./transformer");
const fileService = require("@services/fileService");

const {
  NotFoundException,
  ServerException,
} = require("@components/exceptions");

exports.product = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findProduct = await productService.findBy("_id", id);

    if (!findProduct.success) {
      throw new ServerException(findProduct.error);
    }

    if (!findProduct.product) {
      throw new NotFoundException("Not Found!");
    }

    res.send({
      success: true,
      product: transformProduct.getProduct(findProduct.product),
    });
  } catch (error) {
    next(error);
  }
};

exports.products = async (req, res) => {
  const products = await productService.findAll();

  if (!products.success) {
    return res.status(500).send({ success: false });
  }

  res.send({
    success: true,
    products: transformProduct.getProducts(products.data),
  });
};

exports.create = async (req, res, next) => {
  try {
    const { title, price, discountedPrice, count } = req.body;

    const { thumbnail, gallery } = req.files;

    const galleryData = gallery.map((image) => ({
      path: image.path,
    }));

    const data = {
      title,
      thumbnail: thumbnail[0].path,
      gallery: galleryData,
      price,
      discountedPrice,
      count,
    };

    const create = await productService.save(data);

    if (!create.success) {
      throw new ServerException(create.error);
    }

    res.status(201).send({
      success: true,
    });
    
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const { title, price, discountedPrice, count, deletedGalleryImages } =
    req.body;

  const findProduct = await productService.findBy("_id", id);

  if (!findProduct.success) {
    return res.status(422).send({
      success: false,
    });
  }

  const product = findProduct.product;

  let productGallery = product.gallery;

  let updatedData = {
    title,
    price,
    discountedPrice,
    count,
  };

  if (deletedGalleryImages) {
    const imagesForDelete = productGallery
      .filter((image) => deletedGalleryImages.includes(image._id))
      .map((image) => image.path);

    const resizedGalleryForDelete = imagesForDelete.map((imagePath) => {
      const pathParts = imagePath.split("/");
      const galleryFilename = `gallery-${pathParts.pop()}`;

      const resizedPath = `${pathParts.join("/")}/${galleryFilename}`;

      return resizedPath;
    });

    fileService.deleteMany(imagesForDelete);
    fileService.deleteMany(resizedGalleryForDelete);

    productGallery = productGallery.filter(
      (image) => !deletedGalleryImages.includes(image._id)
    );

    updatedData.gallery = productGallery;
  }

  if (req.files.thumbnail) {
    const resizedThumbanilPathParts = product.thumbnail.split("/");
    const filename = `thumbnail-${resizedThumbanilPathParts.pop()}`;
    const resizedThumbanilPath = `${resizedThumbanilPathParts.join(
      "/"
    )}/${filename}`;

    fileService.delete(product.thumbnail);
    fileService.delete(resizedThumbanilPath);

    updatedData.thumbnail = req.files.thumbnail[0].path;
  }

  if (req.files.gallery) {
    const newGallery = req.files.gallery.map((image) => ({
      path: image.path,
    }));

    updatedData.gallery = [...productGallery, ...newGallery];
  }

  const updateResult = await productService.updateOne({ _id: id }, updatedData);

  if (!updateResult.success) {
    return res.status(500).send({
      success: false,
    });
  }

  res.send({
    success: true,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const findProduct = await productService.findBy("_id", id);

  if (!findProduct.success) {
    return res.status(422).send({
      success: false,
    });
  }

  const product = findProduct.product;

  const galleryPaths = product.gallery.map((image) => image.path);

  const resizedGalleryPaths = galleryPaths.map((imagePath) => {
    const pathParts = imagePath.split("/");
    const galleryFilename = `gallery-${pathParts.pop()}`;

    const resizedPath = `${pathParts.join("/")}/${galleryFilename}`;

    return resizedPath;
  });

  const resizedThumbanilPathParts = product.thumbnail.split("/");
  const filename = `thumbnail-${resizedThumbanilPathParts.pop()}`;
  const resizedThumbanilPath = `${resizedThumbanilPathParts.join(
    "/"
  )}/${filename}`;

  fileService.delete(product.thumbnail);
  fileService.delete(resizedThumbanilPath);

  fileService.deleteMany(galleryPaths);
  fileService.deleteMany(resizedGalleryPaths);

  const deleteProduct = await productService.deleteOne({ _id: id });

  if (!deleteProduct.success) {
    return res.status(500).send({
      success: false,
    });
  }

  res.send({
    success: true,
  });
};
