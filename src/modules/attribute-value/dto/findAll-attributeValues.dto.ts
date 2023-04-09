import { HttpException, HttpStatus } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Attribute } from "src/modules/attribute/entities/attribute.entity";

export class FindAllAttributeValuesDto{

    @IsOptional()
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    page?: string

    @IsOptional()
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    limit?: string   

    @IsOptional()
    @IsNotEmpty()
    @IsDefined()
    @Transform(async ({value})=> {
        const attribute = await Attribute.findOneBy({slug: value})
        if(!attribute){
            throw new HttpException(`Attribute not found`,HttpStatus.NOT_FOUND)
        }
        return value
    })
    attr?: string
}