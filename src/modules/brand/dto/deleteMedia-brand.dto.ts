import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DeleteMediaBrandDto{
    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string[]
}