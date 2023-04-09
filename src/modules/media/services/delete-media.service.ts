import { DeleteMediaDto } from './../dto/delete-media.dto';
import { Injectable } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class DeleteMediaService {
    async delete(deleteMediaDto: DeleteMediaDto) {
        try {
            const { arrayOfUrl } = deleteMediaDto;
            for (const url of arrayOfUrl) {
                const pic = url.split('/');
                fs.unlinkSync('./images/' + pic[pic.length - 1]);
            }
        } catch (err) {
            throw err;
        }
    }
}
