import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    refreshToken: string
}