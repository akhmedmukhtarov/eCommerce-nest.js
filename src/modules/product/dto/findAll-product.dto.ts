import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsIn, IsNotEmpty, IsOptional, IsString, ValidatePromise } from 'class-validator';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
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
    @ValidatePromise()
    @Transform(async ({value}) => {
        const attrValueSlugs = value.split(',')
        for(const attrValueSlug of attrValueSlugs){
            const attrValue = await AttributeValue.findOneBy({slug: attrValueSlug})
            if(!attrValue){
                throw new HttpException(`Attribute value with slug:${attrValueSlug} not found`, HttpStatus.NOT_FOUND)
            }
        }
        return value
    })
    attr?: Promise<string>

    @ApiProperty()
    @IsOptional()
    @IsString()
    @ValidatePromise()
    @Transform(async ({ value }) => {
        const category = await Category.findOneBy({slug: value });
        if (!category) {
            throw new HttpException(`Category with slug: ${value} not found`, HttpStatus.NOT_FOUND);
        }
        return value;
    })
    category?: Promise<string>

    @ApiProperty()
    @IsString()
    @ValidatePromise()
    @IsOptional()
    @Transform(async ({ value }) => {
        const brand = await Brand.findOneBy({ slug: value });
        if (!brand) {
            throw new HttpException(`Category with slug: ${value} not found`, HttpStatus.NOT_FOUND);
        }
        return value;
    })
    brand?: Promise<string>

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    date: ascDesc;

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    isnew: ascDesc;

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    isfeatured: ascDesc;

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderCount: ascDesc;

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    viewcount: ascDesc;
}
