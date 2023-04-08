import { HttpException, HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Attribute } from "src/modules/attribute/entities/attribute.entity"

export class CreateAttributeValueDto {

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu: string

    @ApiProperty()
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
