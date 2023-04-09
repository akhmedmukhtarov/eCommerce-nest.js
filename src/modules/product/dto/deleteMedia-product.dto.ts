import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMediaProductDto{
    @ApiProperty()
    @IsDefined()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string
}