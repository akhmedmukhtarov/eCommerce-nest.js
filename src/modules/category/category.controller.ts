import { DeleteCategoryService } from './services/delete-category.service';
import { UpdateCategoryService } from './services/update-category.service';
import { GetOneCategoryService } from './services/getOne-category.service';
import { GetAllCategoriesService } from './services/getAll-category.service';
import { CreateCategoryService } from './services/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindAllCategoryDto } from './dto/findAll-category.dto';
import { DeleteMediaCategoryDto } from './dto/deleteMedia-category.dto';
import { DeleteMediaCategoryService } from './services/deleteMedia-category.service';
require('dotenv').config();

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(
        private createCategoryService: CreateCategoryService,
        private getAllCategoriesService: GetAllCategoriesService,
        private getOneCategoryService: GetOneCategoryService,
        private updateCategoryService: UpdateCategoryService,
        private deleteCategoryService: DeleteCategoryService,
        private deleteMediaCategoryService:DeleteMediaCategoryService
    ) {}

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
            return await this.createCategoryService.create(createCategoryDto);
    }

    @ApiQuery({name: 'limit', required: false, description: 'pagination limit'})
    @ApiQuery({name: 'page', required: false, description: 'pagination page'})
    @Get()
    getAllCategories(@Query() findAllCategoryDto: FindAllCategoryDto) {
        return this.getAllCategoriesService.getAllCategories(findAllCategoryDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('delete-media/:slug')
    deleteMedia(@Param('slug') slug: string, @Body() deleteMediaCategoryDto: DeleteMediaCategoryDto ){
        return this.deleteMediaCategoryService.deleteMedia(slug,deleteMediaCategoryDto)
    }

    @Get(':slug')
    getOneCategory(@Param('slug') slug: string) {
        return this.getOneCategoryService.getOneCategory(slug);
    }

    // @ApiBearerAuth()
    // @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':slug')
    updateCatgeory(@Param('slug') slug: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.updateCategoryService.updateCategory(slug, updateCategoryDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':slug')
    deleteCategory(@Param('slug') slug: string) {
        return this.deleteCategoryService.deleteCategory(slug);
    }
}
