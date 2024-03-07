const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Specify the directory containing the images to be converted.
const directoryPath = path.join(__dirname, "../public/images");

// Read the contents of the specified directory.
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error getting directory information.", err);
    return;
  }

  // Process each file in the directory.
  files.forEach((file) => {
    // Check if the file is an image with a supported extension.
    if (file.match(/\.(jpg|jpeg|png)$/)) {
      // Define the source and destination file paths.
      const sourceFilePath = path.join(directoryPath, file);
      const targetFilePath = `${sourceFilePath}.webp`;

      // Use sharp to convert the image to WebP format.
      sharp(sourceFilePath)
        .webp({ quality: 90 })
        .toFile(targetFilePath, (err) => {
          if (err) {
            console.error("Error converting image to WebP", err);
          } else {
            console.log(`Converted ${file} to WebP`);
          }
        });
    }
  });
});
