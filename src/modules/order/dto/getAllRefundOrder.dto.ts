import { IsBoolean, IsInt, IsOptional, Max, Min } from "class-validator"

export class GetAllRefundOrderDto{
    
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(new Date().getFullYear())
    year: number
    

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(11)
    month?: number

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(31)
    day?: number

    @IsOptional()
    @IsBoolean()
    refunded?: boolean
}