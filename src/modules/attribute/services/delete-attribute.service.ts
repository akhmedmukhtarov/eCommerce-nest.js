import { Injectable } from "@nestjs/common";
import { Attribute } from "../entities/attribute.entity";

@Injectable()
export class DeleteAttributeService{
    async delete(id:string){
        Attribute.delete({id:+id})
    }
}