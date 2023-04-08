import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class AdminLoginDto{
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string
}