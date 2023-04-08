import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsInt, IsOptional, Max, Min } from "class-validator"

export class GetAllRefundOrderDto{
    
    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(new Date().getFullYear())
    year: number
    
    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(11)
    month?: number

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(31)
    day?: number

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    refunded?: boolean
}