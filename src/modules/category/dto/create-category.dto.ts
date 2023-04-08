import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, isInt, validate } from 'class-validator';
import { Category } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
const dataSource = require('mysql2')

export class CreateCategoryDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    nameUz: string;
    
    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    nameRu: string;

    @ApiProperty()
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


    @ApiProperty()
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    images: string;
}
