import multer from "multer";
import path from "path";
const storageUploadSiswa = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/upload excel murid/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
});
export const uploadSiswa = multer({
    storage: storageUploadSiswa
});