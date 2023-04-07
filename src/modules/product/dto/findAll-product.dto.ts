import { HttpException, HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDefined, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

type ascDesc = 'asc' | 'desc' | 'ASC' | 'DESC';
export class FindAllProductDto {
    @IsOptional()
    @IsString()
    page?: string;

    @IsOptional()
    @IsString()
    limit?: string;

    @IsOptional()
    @IsString()
    attr?: string;

    @IsOptional()
    @Transform(async ({value})=> {
      const category = await Category.findOneBy({id: +value})
      if(!category){
        throw new HttpException(`Category with id: ${ value} not found`, HttpStatus.NOT_FOUND)
      }
      return value
    })
    category?: string;

    @IsOptional()
    @Transform(async ({value})=> {
      const brand = await Brand.findOneBy({id: +value})
      if(!brand){
        throw new HttpException(`Category with id: ${ value} not found`, HttpStatus.NOT_FOUND)
      }
      return value
    })
    brand?: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc' , 'desc' , 'ASC' , 'DESC'])
    date: ascDesc;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc' , 'desc' , 'ASC' , 'DESC'])
    isnew: ascDesc;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc' , 'desc' , 'ASC' , 'DESC'])
    isfeatured: ascDesc;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc' , 'desc' , 'ASC' , 'DESC'])
    orderCount: ascDesc;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc' , 'desc' , 'ASC' , 'DESC'])
    viewcount: ascDesc;
}
