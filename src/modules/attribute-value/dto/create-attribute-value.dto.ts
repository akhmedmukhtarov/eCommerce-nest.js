import { HttpException, HttpStatus } from "@nestjs/common"
import { Transform } from "class-transformer"
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Attribute } from "src/modules/attribute/entities/attribute.entity"

export class CreateAttributeValueDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu: string

    @IsOptional()
    @Transform(async ({value}) => {
        const attribute = await Attribute.findOneBy({id: +value})
        if(!attribute){
            throw new HttpException(`Attribute with id: ${value} not found`, HttpStatus.NOT_FOUND)
        }
        return value
    })
    attributeId: number
}
