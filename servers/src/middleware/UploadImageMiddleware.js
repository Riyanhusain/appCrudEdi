import multer from "multer";
import path from "path";
import sharp from "sharp";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImageProfile = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");

const resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 80, height: 80 }) // Sesuaikan dengan ukuran yang diinginkan
      .toBuffer();

    req.file.buffer = resizedImageBuffer;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengubah ukuran gambar" });
  }
};

export { uploadImageProfile, resizeImage };
