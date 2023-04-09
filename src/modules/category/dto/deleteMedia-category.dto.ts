import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMediaCategoryDto{
    @ApiProperty()
    @IsDefined()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string
}