import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, isInt, validate } from 'class-validator';
import { Category } from '../entities/category.entity';
const dataSource = require('mysql2')

export class CreateCategoryDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    nameUz: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    nameRu: string;

    @IsOptional()
    @Transform(async ({value}): Promise<number> =>{
        if(value !== 0){
            const category = await Category.findOneBy({id: value})
            if(!category){
                throw new HttpException(`Category with id: ${value} not found`, HttpStatus.NOT_FOUND)
            }
            return value
        }
        return value
        
    })
    parentId?: number


    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    images: string;
}
