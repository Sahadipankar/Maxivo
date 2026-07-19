import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDirectory = path.resolve(__dirname, "../public")

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true })
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
let upload = multer({ storage })

export default upload
