import { diskStorage } from "multer";
import { extname } from "path";

export const multerConfig = {
    storage : diskStorage({
        destination: './images',
        filename: (req,file,cb) => {
            const uniqueSuffix = Date.now()+'-'+ Math.floor(Math.random()*2023)
            const ext = extname(file.originalname)
            const filename = uniqueSuffix + ext
            cb(null,filename)
        }
    }),
       


}