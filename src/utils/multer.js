import multer, { diskStorage } from "multer";

export function uploadFiles() {
  const storage = diskStorage({});
  const fileFilter = (req, file, cb) => {
    if (file.mimetype != "application/pdf") {
      return cb(new Error("Invaild File Format"), false);
    }
    return cb(null, true);
  };
  const multerUpload = multer({ storage, fileFilter });
  return multerUpload;
}
