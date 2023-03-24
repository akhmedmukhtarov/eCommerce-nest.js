import { ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
require('dotenv').config()

export const parseFilePipeBuilder = new ParseFilePipeBuilder()
    .addMaxSizeValidator({
        maxSize: + process.env.MAX_UPLOAD_IMAGE_SIZE,
    })
    .addFileTypeValidator({
        fileType: /\.jpg|jpeg|gif|heic|png$/,
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    
