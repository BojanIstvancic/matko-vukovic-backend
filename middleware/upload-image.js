const multer = require("multer");
const { extname } = require("path");

const storage = multer.diskStorage({
  destination: "images",
  // destination where file will be saved
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
