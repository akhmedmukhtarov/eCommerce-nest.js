import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator"

export class VerifyOtpDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    phone: string

    @IsDefined()
    @IsNotEmpty()
    @IsInt()
    otp: number
}