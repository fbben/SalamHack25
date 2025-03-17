// this file is to configure Multer for handling file uploads in the application.

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storyContentImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "story-content-images", // Folder in Cloudinary
    ressource_type: "image", // Automatically upload images to Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const storyContentImageUpload = multer({ storyContentImage });

module.exports = storyContentImageUpload;