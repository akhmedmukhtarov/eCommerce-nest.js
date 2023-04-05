import { DeleteCategoryService } from './services/delete-category.service';
import { UpdateCategoryService } from './services/update-category.service';
import { GetOneCategoryService } from './services/getOne-category.service';
import { GetAllCategoriesService } from './services/getAll-category.service';
import { CreateCategoryService } from './services/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
require('dotenv').config();

@Controller('category')
export class CategoryController {
    constructor(
        private createCategoryService: CreateCategoryService,
        private getAllCategoriesService: GetAllCategoriesService,
        private getOneCategoryService: GetOneCategoryService,
        private updateCategoryService: UpdateCategoryService,
        private deleteCategoryService: DeleteCategoryService,
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.createCategoryService.create(createCategoryDto);
    }

    @Get()
    getAllCategories() {
        return this.getAllCategoriesService.getAllCategories();
    }

    @Get(':id')
    getOneCategory(@Param('id') id: string) {
        return this.getOneCategoryService.getOneCategory(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    updateCatgeory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.updateCategoryService.updateCategory(id, updateCategoryDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.deleteCategoryService.deleteCategory(id);
    }
}
