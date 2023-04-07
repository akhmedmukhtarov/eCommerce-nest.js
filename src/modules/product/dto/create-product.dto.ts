import { HttpException, HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateProductDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descShortUz?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descShortRu?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descriptionUz?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descriptionRu?: string;

    @IsOptional()
    @IsInt()
    quantity?: number;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @IsOptional()
    @IsBoolean()
    isPopular?: boolean;

    @IsOptional()
    @IsBoolean()
    isNew?: boolean;

    @IsOptional()
    @IsNumber()
    discount?: number;

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

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    images: string;

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
