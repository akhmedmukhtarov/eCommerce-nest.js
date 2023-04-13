import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, ValidatePromise } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class FindAllAttirbuteDto {
    @IsOptional()
    @IsString()
    @ValidatePromise()
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
    categ?: Promise<string>

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    page?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    limit?: string;
}
