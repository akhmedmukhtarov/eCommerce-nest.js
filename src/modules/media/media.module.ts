import { DeleteMediaService } from './services/delete-media.service';
import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { UploadMediaService } from './services/upload-media.service';

@Module({
  controllers: [MediaController],
  providers: [UploadMediaService, DeleteMediaService]
})
export class MediaModule {}
