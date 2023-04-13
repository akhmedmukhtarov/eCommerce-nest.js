import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
    @IsString()
    isFilterable?: boolean;

    @IsNotEmpty()
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
    categoryId: number[];
}
