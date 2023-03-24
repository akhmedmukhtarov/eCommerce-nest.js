import { Injectable } from "@nestjs/common";
import { Brand } from "../entities/brand.entity";

@Injectable()
export class DeleteBrandService{
    async delete(id:string){
        try{
            const result = Brand.delete({id:+id})
            return result
        }catch(err){
            throw err
        }
    }
}