import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    phone: string
}