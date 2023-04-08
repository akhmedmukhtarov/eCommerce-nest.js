import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsIn, IsNotEmpty, IsOptional } from "class-validator";


export class FindAllOrdersDto{

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    page?: string

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    limit?: string

    @ApiProperty()
    @IsOptional()
    @IsIn(['pending','processing', 'ontheway','delivered','cancelled'])
    status?: 'pending'|'processing'| 'ontheway'|'delivered'|'cancelled'

}