import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Category } from 'src/modules/category/entities/category.entity';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    // @ApiProperty()
    // @IsOptional()
    // @IsDefined()
    // @IsNotEmpty()
    // @Transform(async ({value})=> {
    //     console.log(await value);
        
    //     for(const id of value){
    //         const category = await Category.findOneBy({id: +id})
    //         if(!category){
    //             throw new HttpException(`Category with id: ${id} not found`, HttpStatus.NOT_FOUND)
    //         }
    //     }
    //     return value
    // })
    // categoryId: number[]
}
