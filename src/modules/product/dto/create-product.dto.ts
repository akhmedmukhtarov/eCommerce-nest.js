import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateProductDto {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descShortUz?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descShortRu?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descriptionUz?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descriptionRu?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    quantity?: number;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isPopular?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isNew?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discount?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(async ({ value }) => {
        for (const categoryId of value) {
            const category = await Category.findOneBy({ id: +categoryId });
            if(!category){
                throw new HttpException(`Category with Id: ${categoryId} not found`, HttpStatus.NOT_FOUND)
            }
        }
        return value
    })
    categoryId: number[];

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    images: string;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(async ({value}) => {
        for(const attributeValueId of value){
            const attributeValue = await AttributeValue.findOneBy({id: +attributeValueId})
            if(!attributeValue){
                throw new HttpException(`Attribute value with id: ${attributeValueId} not found`, HttpStatus.NOT_FOUND)
            }
        } 
        return value
    })
    attributeValueId?: number[];

    @ApiProperty()
    @IsNotEmpty()
    @Transform(async ({value}) => {
        const brand = await Brand.findOneBy({id: +value})
        if(!brand){
            throw new HttpException(`Brand with id: ${value} not found`, HttpStatus.NOT_FOUND)
        }
        return value
    })
    brandId: number;
}
