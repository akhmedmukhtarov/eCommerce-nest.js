import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class FindAllAttirbuteDto {

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @Transform(async ({ value }) => {
        try {
            for(const categoryId of value){
                const category = await Category.findOneBy({ id: +categoryId });
                if(!category){
                    throw new HttpException(`Category with id: ${categoryId} not found`, HttpStatus.NOT_FOUND)
                }
            }
            return value
        } catch (error) {
            throw error;
        }
    })
    categ?: number;
}
