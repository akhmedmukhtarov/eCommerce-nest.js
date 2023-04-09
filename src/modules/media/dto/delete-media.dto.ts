import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteMediaDto{

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    arrayOfUrl: string[]
}