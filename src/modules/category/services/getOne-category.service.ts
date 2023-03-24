import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

Injectable()
export class GetOneCategoryService{
    async getOneCategory(id: string){
        const category = await Category.findOneBy({id: +id})
        return category
    }
}