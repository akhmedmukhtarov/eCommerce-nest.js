import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SetModeratorDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    phone?: string
}