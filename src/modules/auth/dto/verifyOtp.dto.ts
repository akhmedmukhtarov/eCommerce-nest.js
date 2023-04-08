import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator"

export class VerifyOtpDto {

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsInt()
    otp: number
}