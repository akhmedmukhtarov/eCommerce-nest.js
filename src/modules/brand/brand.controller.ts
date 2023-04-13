import { DeleteCategoryService } from './../category/services/delete-category.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandService } from './services/create-brand.service';
import { DeleteBrandService } from './services/delete-brand.service';
import { FindAllBrandService } from './services/findAll-brand.service';
import { GetOneBrandService } from './services/getOne-brand.service';
import { UpdateBrandService } from './services/update-brand.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindAllBrandsDto } from './dto/findAll-brand.dto';
import { DeleteMediaBrandDto } from './dto/deleteMedia-brand.dto';
import { DeleteMediaBrandService } from './services/deleteMedia-brand.service';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
    constructor(
        private readonly createBrandService: CreateBrandService,
        private readonly findAllBrandService: FindAllBrandService,
        private readonly getOneBrandService: GetOneBrandService,
        private readonly updateBrandService: UpdateBrandService,
        private readonly deleteBrandService: DeleteBrandService,
        private readonly deleteMediaBrandService:DeleteMediaBrandService,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.createBrandService.create(createBrandDto);
    }

    @ApiQuery({name: 'page', required:false, description: 'pagination page'})
    @ApiQuery({name: 'limit', required:false, description: 'pagination limit'})
    @Get()
    findAll(@Query() findAllBrandsDto:FindAllBrandsDto) {
        return this.findAllBrandService.findAll(findAllBrandsDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('delete-media/:slug')
    deleteMedia(@Param('slug') slug: string, @Body() deleteMediaBrandDto:DeleteMediaBrandDto ){
        return this.deleteMediaBrandService.deleteMedia(slug,deleteMediaBrandDto)
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.getOneBrandService.getOne(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':slug')
    update(@Param('slug') slug: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.updateBrandService.update(slug, updateBrandDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':slug')
    remove(@Param('slug') slug: string) {
        return this.deleteBrandService.delete(slug);
    }
}
