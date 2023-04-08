import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

type ascDesc = 'asc' | 'desc' | 'ASC' | 'DESC';
export class FindAllProductDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    page?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    limit?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    attr?: string;

    @ApiProperty()
    @IsOptional()
    @Transform(async ({ value }) => {
        const category = await Category.findOneBy({ id: +value });
        if (!category) {
            throw new HttpException(`Category with id: ${value} not found`, HttpStatus.NOT_FOUND);
        }
        return value;
    })
    category?: string;

    @ApiProperty()
    @IsOptional()
    @Transform(async ({ value }) => {
        const brand = await Brand.findOneBy({ id: +value });
        if (!brand) {
            throw new HttpException(`Category with id: ${value} not found`, HttpStatus.NOT_FOUND);
        }
        return value;
    })
    brand?: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    date: ascDesc;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    isnew: ascDesc;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    isfeatured: ascDesc;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderCount: ascDesc;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    viewcount: ascDesc;
}
