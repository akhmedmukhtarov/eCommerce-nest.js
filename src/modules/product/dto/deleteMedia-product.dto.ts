import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMediaProductDto{
    @ApiProperty({type: 'Array of url of the image/s', example: ['url', 'url1']})
    @IsDefined()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string
}