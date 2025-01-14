import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../profilePics");
        if(!fs.existsSync(uploadDir)){
            fs.mkDir(uploadDir)
        }
        cb(null, uploadDir) 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "-" + file.originalname);
    }
})

const upload = multer({storage});