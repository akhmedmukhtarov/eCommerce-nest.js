import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteMediaDto{

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    url: string
}