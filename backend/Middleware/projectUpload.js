import multer from "multer";

const fileFilter = (_req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    return callback(null, true);
  }

  return callback(new Error("Only image files are allowed."));
};

export const projectImageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
