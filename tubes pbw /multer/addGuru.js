import multer from "multer";
import path from "path";
const storageUploadGuru = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/upload excel guru/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
});
export const uploadGuru = multer({
    storage: storageUploadGuru
});