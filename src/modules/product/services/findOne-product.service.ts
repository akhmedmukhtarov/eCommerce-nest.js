import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";

@Injectable()
export class FindOneProductservice{
    async findOne(id:string){
        const product = await Product.findBy({id:+id})
        return product
    }
}