import { DeleteProductService } from './services/delete-product.service';
import { FindOneProductservice } from './services/findOne-product.service';
import { FindAllProductService } from './services/findAll-product.service';
import { CreateProductService } from './services/create-product.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductService } from './services/update-product.service';
import { FindAllProductDto } from './dto/findAll-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteMediaProductDto } from './dto/deleteMedia-product.dto';
import { DeleteMediaProductService } from './services/deleteMedia-product.service';
import { SearchProductService } from './services/search-product.service';
import { SearchProductDto } from './dto/search-product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(
        private createProductService: CreateProductService,
        private findAllProductService: FindAllProductService,
        private findOneProductservice: FindOneProductservice,
        private updateProductService: UpdateProductService,
        private deleteProductService: DeleteProductService,
        private deleteMediaProductService:DeleteMediaProductService,
        private searchProductService:SearchProductService
    ) {}

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.createProductService.create(createProductDto);
    }

    @ApiQuery({name: 'page', required: false, schema: {type: 'integer'}, description: 'pagination page'})
    @ApiQuery({name: 'limit', required: false, schema: {type: 'integer'}, description: 'pagination limit'})
    @ApiQuery({name: 'attr', required: false, schema: {type: 'slug'}, description: 'string of attribute value slugs divided by comma ex:"attrValue,attrvalue1"'})
    @ApiQuery({name: 'category', required: false, schema: {type: 'slug'}, description: 'slug of exact category'})
    @ApiQuery({name: 'brand', required: false, schema: {type: 'slug'}, description: 'slug of exact brand'})
    @ApiQuery({name: 'date', required: false, schema: {type: 'asc/desc'}, description: 'sort by date'})
    @ApiQuery({name: 'isNew', required: false, schema: {type: 'asc/desc'}, description: 'sort by "isNew"'})
    @ApiQuery({name: 'isFeatured', required: false, schema: {type: 'asc/desc'}, description: 'sort by "isFeatured"'})
    @ApiQuery({name: 'ordercount', required: false, schema: {type: 'asc/desc'}, description: 'sort by order count'})
    @ApiQuery({name: 'viewCount', required: false, schema: {type: 'asc/desc'}, description: 'sort by view count'})

    @Get()
    findAll(@Query() findAllProductDto: FindAllProductDto) {
        return this.findAllProductService.findAll(findAllProductDto);
    }

    @ApiQuery({name: 'keyword', required: true, description: 'keyword for search english/cyrillic'})
    @Post('search')
    search(@Query() searchProductDto:SearchProductDto){
        return this.searchProductService.search(searchProductDto)
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('delete-media/:slug')
    deleteMedia(@Param('slug') slug: string, @Body() deleteMediaProductDto: DeleteMediaProductDto){
        return this.deleteMediaProductService.deleteMedia(slug,deleteMediaProductDto)
    }


    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.findOneProductservice.findOne(slug);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Patch(':slug')
    update(@Param('slug') slug: string, @Body() updateProductDto: UpdateProductDto) {
        return this.updateProductService.update(slug, updateProductDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':slug')
    remove(@Param('slug') slug: string) {
        return this.deleteProductService.delete(slug);
    }
}
