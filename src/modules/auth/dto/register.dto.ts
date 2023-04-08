import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    phone: string
}