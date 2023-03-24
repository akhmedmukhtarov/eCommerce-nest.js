import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";

@Injectable()
export class FindAllProductService{
    async findAll(){
        const products = await Product.find()
        return products
    }
}