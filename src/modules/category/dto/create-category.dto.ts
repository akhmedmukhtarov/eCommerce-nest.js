import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidatePromise, isDefined, isInt, isNotEmpty, validate } from 'class-validator';
import { Category } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/product/entities/product.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';

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

    @ApiProperty({type: 'Parent id of category', example: 0})
    @IsInt()
    @ValidatePromise()
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
    parentId?: Promise<number>


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

    @ApiProperty({type: 'Array of product id', example: [1,2]})
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @IsDefined()
    @IsNotEmpty()
    @ValidatePromise()
    @Transform(async ({value})=>{
        for(const id of value){
            const product = await Product.findOneBy({id})
            if(!product){
                throw new NotFoundException(`Product with id: ${id} not found`)
            }
        }
        return value
    })
    arrayOfProductId: Promise<number[]>

    @ApiProperty({type: 'Array of attribute id', example: [1,2]})
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @IsDefined()
    @IsNotEmpty()
    @ValidatePromise()
    @Transform(async ({value})=>{
        for(const id of value){
            const attribute = await Attribute.findOneBy({id})
            if(!attribute){
                throw new NotFoundException(`Product with id: ${id} not found`)
            }
        }
        return value
    })
    arrayOfAttributeId: Promise<number[]>

    @ApiProperty({type: 'Array of brand id', example: [1,2]})
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @IsDefined()
    @IsNotEmpty()
    @ValidatePromise()
    @Transform(async ({value})=>{
        for(const id of value){
            const brand = await Brand.findOneBy({id})
            if(!brand){
                throw new NotFoundException(`Product with id: ${id} not found`)
            }
        }
        return value
    })
    arrayOfBrandId: Promise<number[]>
}
