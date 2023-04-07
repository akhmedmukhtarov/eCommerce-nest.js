import { Transform } from "class-transformer"
import { IsArray, IsDate, IsDefined, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator"

import { HttpException, HttpStatus } from "@nestjs/common"
import { Product } from "src/modules/product/entities/product.entity"

type ProductIdAndQty = {
    productId: number
    qty: number
}
export class CreateOrderDto {

    @IsDefined()
    @IsArray()
    @Transform(async ({value})=> {
        for(const obj of value){
            const product = await Product.findOneBy({id: obj.productId})
            if(!product){
                throw new HttpException(`Product with id: ${obj.productId} not found`, HttpStatus.NOT_FOUND)
            }
        }
        return value
        
    })
    productIdAndQty: ProductIdAndQty[]


    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['unpaid','paid'])
    paymentStatus: 'unpaid' | 'paid'

    @IsDefined()
    @IsString()
    @IsIn(['cod', "click" , "payme" , "apelsin"])
    paymentMethod: 'cod'| "click" | "payme" | "apelsin"


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    note?: string

    @IsOptional()
    @IsString()
    @IsIn(['pending','processing', 'ontheway','delivered','cancelled'])
    status?: 'pending'|'processing'| 'ontheway'|'delivered'|'cancelled'

    @IsOptional()
    @IsNumber()    
    deliveryPrice?: number

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    deliveryAddress: string 

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    deliveryPhone: string


    @IsOptional()
    @IsDate()
    refundRequestedAt?: Date

    @IsOptional()
    @IsDate()
    refundedAt?: Date

}
