import { DeleteMediaDto } from './dto/delete-media.dto';
import { DeleteMediaService } from './services/delete-media.service';
import { UploadMediaService } from './services/upload-media.service';
import { Controller, Post, UseInterceptors, UploadedFiles, Body, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/configs/multer.config';
import { parseFilePipeBuilder } from 'src/common/pipes/pipeBuilder-pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('media')
export class MediaController {
    constructor(private uploadMediaService: UploadMediaService, private deleteMediaService: DeleteMediaService) {}

    @UseInterceptors(
        FilesInterceptor(
            'images',
            +process.env.MAX_COUNT_OF_IMAGE,
            multerConfig,
        ),
    )
    @Post('upload')
    upload(
        @UploadedFiles(parseFilePipeBuilder)
        images: Array<Express.Multer.File>,
    ) {
        return this.uploadMediaService.upload(images);
    }

    @Post('delete')
    delete(@Body() deleteMediaDto: DeleteMediaDto) {
        return this.deleteMediaService.delete(deleteMediaDto);
    }
}
