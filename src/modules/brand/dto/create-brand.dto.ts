import { HttpException, HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsBoolean, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, ValidatePromise } from "class-validator"
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

    @ApiProperty({type: 'array of one or more url of picture', example: ['url', 'url1']})
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    images: string[]

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    status?: boolean


    @ApiProperty({type: 'array of category id', example: [1,2]})
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @ValidatePromise()
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
    arrayOfCategoryId: Promise<number[]>

}
