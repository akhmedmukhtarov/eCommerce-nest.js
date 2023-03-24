import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductService } from './services/create-product.service';
import { DeleteProductService } from './services/delete-product.service';
import { FindAllProductService } from './services/findAll-product.service';
import { FindOneProductservice } from './services/findOne-product.service';
import { UpdateProductService } from './services/update-product.service';

@Module({
    controllers: [ProductController],
    providers: [
        CreateProductService,
        FindAllProductService,
        FindOneProductservice,
        UpdateProductService,
        DeleteProductService,
    ],
})
export class ProductModule {}
