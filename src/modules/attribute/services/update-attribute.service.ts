import { UpdateAttributeDto } from './../dto/update-attribute.dto';

import { Injectable } from "@nestjs/common";
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class UpdateAttributeService{
    async update(id:string, updateAttributeDto: UpdateAttributeDto){
        Attribute.update(+id,updateAttributeDto)
    }
}