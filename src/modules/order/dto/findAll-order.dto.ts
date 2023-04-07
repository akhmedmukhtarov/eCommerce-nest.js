import { IsDefined, IsIn, IsNotEmpty, IsOptional } from "class-validator";


export class FindAllOrdersDto{


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    page?: string

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    limit?: string

    @IsOptional()
    @IsIn(['pending','processing', 'ontheway','delivered','cancelled'])
    status?: 'pending'|'processing'| 'ontheway'|'delivered'|'cancelled'

}