import { UpdateCategoryService } from './services/update-category.service';
import { GetOneCategoryService } from './services/getOne-category.service';
import { CreateCategoryService } from './services/create-category.service';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { GetAllCategoriesService } from './services/getAll-category.service';
import { DeleteCategoryService } from './services/delete-category.service';

@Module({
    controllers: [CategoryController],
    providers: [
        CreateCategoryService,
        GetAllCategoriesService,
        GetOneCategoryService,
        UpdateCategoryService,
        DeleteCategoryService
    ],
})
export class CategoryModule {}
