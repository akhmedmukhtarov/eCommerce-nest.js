import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsJWT, IsNotEmpty, IsString } from "class-validator";

export class AdminRefreshTokenDto {
    @ApiProperty()
    @IsJWT()
    @IsNotEmpty()
    @IsDefined()
    refreshToken: string
}