import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteMediaDto{

    @ApiProperty({type: 'Array of url of the picture/s', example: ['url']})
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string[]
}