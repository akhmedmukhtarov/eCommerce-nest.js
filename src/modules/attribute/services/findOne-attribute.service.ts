import { Injectable } from "@nestjs/common";
import { Attribute } from "../entities/attribute.entity";

@Injectable()
export class FindOneAttributeService{
    async findOne(id:string){
        const attribute = await Attribute.findOneBy({id:+id})
        return attribute
    }
}