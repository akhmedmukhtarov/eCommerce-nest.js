import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";

@Injectable()
export class DeleteProductService{
    async delete(id:string){
        return Product.delete(+id)
    }
}