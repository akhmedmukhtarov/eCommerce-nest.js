import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, ValidatePromise } from 'class-validator';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { Product } from 'src/modules/product/entities/product.entity';

export class CreateAttributeValueDto {
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
    @IsInt()
    @ValidatePromise()
    @IsNotEmpty()
    @Transform(async ({ value }) => {
        try {
            const attribute = await Attribute.findOneBy({ id: +value });
            if (!attribute) {
                throw new HttpException(`Attribute with id: ${value} not found`, HttpStatus.NOT_FOUND);
            }
            return value;
        } catch (error) {
            throw error;
        }
    })
    attributeId: Promise<number>;

    @ApiProperty()
    @ValidatePromise()
    @IsArray()
    @IsInt({ each: true })
    @Transform(async ({ value }) => {
        try {
            for (const id of value) {
                const product = await Product.findOneBy({ id });
                if (!product) {
                    throw new NotFoundException(`Product with id: ${id} not found`);
                }
            }
            return value;
        } catch (error) {
            throw error;
        }
    })
    productId: Promise<number[]>;
}
