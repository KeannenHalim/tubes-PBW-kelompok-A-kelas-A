import multer from "multer";
import path from "path";
const storageUploadVaksin = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.session.ID_U;
        cb(null, `./public/vaksin/${id}/`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
});
export const uploadVaksin = multer({
    storage: storageUploadVaksin
});