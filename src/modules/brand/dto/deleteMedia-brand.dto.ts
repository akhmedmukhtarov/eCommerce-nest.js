import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DeleteMediaBrandDto{
    @ApiProperty({type: 'Array of url of the picture', example: ["url","url1"]})
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string[]
}