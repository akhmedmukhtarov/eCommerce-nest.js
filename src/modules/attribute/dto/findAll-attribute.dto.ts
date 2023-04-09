import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class FindAllAttirbuteDto {
    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @Transform(async ({ value }) => {
        try {
            const category = await Category.findOneBy({slug: value});
            if (!category) {
                throw new HttpException(`Category with slug: ${value} not found`, HttpStatus.NOT_FOUND);
            }
            return value;
        } catch (error) {
            throw error;
        }
    })
    categ?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    page?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    limit?: string;
}
