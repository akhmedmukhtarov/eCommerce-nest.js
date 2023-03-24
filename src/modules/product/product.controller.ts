import { DeleteProductService } from './services/delete-product.service';

import { FindOneProductservice } from './services/findOne-product.service';
import { FindAllProductService } from './services/findAll-product.service';
import { CreateProductService } from './services/create-product.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductService } from './services/update-product.service';

@Controller('product')
export class ProductController {
    constructor(
        private createProductService: CreateProductService,
        private findAllProductService: FindAllProductService,
        private findOneProductservice: FindOneProductservice,
        private updateProductService: UpdateProductService,
        private deleteProductService: DeleteProductService,
    ) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.createProductService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.findAllProductService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.findOneProductservice.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.updateProductService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteProductService.delete(id);
    }
}
