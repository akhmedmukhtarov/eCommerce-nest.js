import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, ValidatePromise } from 'class-validator';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateAttributeDto {
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
    @IsBoolean()
    isFilterable?: boolean;

    @ApiProperty({type: 'array of category id', example: [1,2]})
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @ValidatePromise()
    @Transform(async ({ value }) => {
        try {
            for (const id of value) {
                const category = await Category.findOneBy({ id: +id });
                if (!category) {
                    throw new HttpException(`Category with id: ${id} not found`, HttpStatus.NOT_FOUND);
                }
            }
            return value;
        } catch (error) {
            throw error;
        }
    })
    arrayOfCategoryId: Promise<number[]>

    @ApiProperty({type: 'array of attribute value id', example: [1,2]})
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @ValidatePromise()
    @Transform(async ({ value }) => {
        try {
            for (const id of value) {
                const attributeValue = await AttributeValue.findOneBy({ id: +id });
                if (!attributeValue) {
                    throw new HttpException(`Attribute value with id: ${id} not found`, HttpStatus.NOT_FOUND);
                }
            }
            return value;
        } catch (error) {
            throw error;
        }
    })
    arrayOfAttributeValueId: Promise<number[]>
}
