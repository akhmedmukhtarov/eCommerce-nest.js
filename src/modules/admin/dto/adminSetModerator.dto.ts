import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SetModeratorDto{
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

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    phone?: string
}