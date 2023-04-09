import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { CreateBrandService } from './services/create-brand.service';
import { DeleteBrandService } from './services/delete-brand.service';
import { FindAllBrandService } from './services/findAll-brand.service';
import { GetOneBrandService } from './services/getOne-brand.service';
import { UpdateBrandService } from './services/update-brand.service';
import { DeleteMediaBrandService } from './services/deleteMedia-brand.service';

@Module({
    controllers: [BrandController],
    providers: [
        CreateBrandService,
        FindAllBrandService,
        GetOneBrandService,
        UpdateBrandService,
        DeleteBrandService,
        DeleteMediaBrandService
    ],
})
export class BrandModule {}
