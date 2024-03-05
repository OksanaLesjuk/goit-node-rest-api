import multer from "multer";
import path from 'path';
import crypto from "crypto";
import Jimp from "jimp"

const tmpDir = path.join(process.cwd(), "../", "tmp")

const multerConfig = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => {
        const prefix = crypto.randomUUID();
        const filename = `${prefix}-${file.originalname}`

        cb(null, filename);
    }
})

export const upload = multer({
    storage: multerConfig,

})