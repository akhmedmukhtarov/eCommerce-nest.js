import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteModeratorDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    username: string
}