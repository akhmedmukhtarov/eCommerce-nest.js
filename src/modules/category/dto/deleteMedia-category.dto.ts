import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMediaCategoryDto{
    @ApiProperty({type: 'Array of url of the picture', example: ['url,url1']})
    @IsDefined()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string
}