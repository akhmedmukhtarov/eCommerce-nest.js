import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class AdminLoginDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string
}