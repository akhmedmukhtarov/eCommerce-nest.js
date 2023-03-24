import { Injectable } from "@nestjs/common";
import { Attribute } from "../entities/attribute.entity";

@Injectable()
export class GetAllAttributeService{
    async getAll(){
        const attributes = await Attribute.find()
        return attributes
    }
}