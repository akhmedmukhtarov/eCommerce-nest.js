import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadMediaService {
    async upload(imagesData: Array<Express.Multer.File>){
        let images: string|string[]= []
        for(const image of imagesData){
            images.push(image.path)
        }
        images = images.join(",")
        return images
    }
}