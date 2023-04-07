import { HttpException, HttpStatus } from "@nestjs/common"
import { Transform } from "class-transformer"
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Category } from "src/modules/category/entities/category.entity"

export class CreateBrandDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu:string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    images: string

    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @IsOptional()
    @IsBoolean()
    status?: boolean


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
