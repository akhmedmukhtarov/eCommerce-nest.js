

import { Injectable } from "@nestjs/common";
import { Category } from "../entities/category.entity";

@Injectable()
export class DeleteCategoryService{
    async deleteCategory(id:string){
        Category.delete({id: +id})
    }
}