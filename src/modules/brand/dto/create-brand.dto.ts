import { HttpException, HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Category } from "src/modules/category/entities/category.entity"

export class CreateBrandDto {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu:string

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    images: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    status?: boolean


    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(async ({value})=> {
        for(const id of value){
            const category = await Category.findOneBy({id: +id})
            if(!category){
                throw new HttpException(`Category with id: ${id} not found`, HttpStatus.NOT_FOUND)
            }
        }
        return value
    })
    categoryId: number[]

}
