const path = require("path");

const imageService = require("@services/imageService");

const baseMedia = path.resolve(__dirname, "../../../public/uploads/media");

module.exports = async (req, res, next) => {
  const { thumbnail, gallery } = req.files;

  if (thumbnail && thumbnail[0]) {
    const path = thumbnail[0].path;
    const filename = path.split("/").pop();
    const thumbnailPath = `${baseMedia}/thumbnail-${filename}`;

    const resizedImage = await imageService.resize(200, 200, path);

    await imageService.save(resizedImage, thumbnailPath);
  }

  if (gallery && gallery.length > 0) {
    gallery.forEach(async (image) => {
      const filename = image.path.split("/").pop();

      const galleryPath = `${baseMedia}/gallery-${filename}`;

      const resizedImage = await imageService.resize(400, 400, image.path);

      await imageService.save(resizedImage, galleryPath);
    });
  }

  next();
};
