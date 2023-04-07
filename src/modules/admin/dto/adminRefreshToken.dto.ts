import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class AdminRefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    refreshToken: string
}