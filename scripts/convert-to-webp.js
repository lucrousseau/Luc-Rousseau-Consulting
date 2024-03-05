const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../public/images");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Error getting directory information.", err);
    return;
  }
  files.forEach((file) => {
    if (file.match(/\.(jpg|jpeg|png)$/)) {
      sharp(`${directoryPath}/${file}`)
        .webp({ quality: 90 })
        .toFile(`${directoryPath}/${file}.webp`, (err, info) => {
          if (err) {
            console.log("Error converting image to WebP", err);
          } else {
            console.log(`Converted ${file} to WebP`);
          }
        });
    }
  });
});
