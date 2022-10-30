import multer from "multer";
import path from "path";
const storageUploadRuangan = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/upload excel ruangan/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
});
export const uploadRuangan = multer({
    storage: storageUploadRuangan
});