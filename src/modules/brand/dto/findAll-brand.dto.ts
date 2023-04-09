import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class FindAllBrandsDto {

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    page?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    limit?: string;
}
