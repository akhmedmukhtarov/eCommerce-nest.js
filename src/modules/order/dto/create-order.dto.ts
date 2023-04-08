import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsDefined, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/modules/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

type ProductIdAndQty = {
    productId: number;
    qty: number;
};
export class CreateOrderDto {
    @ApiProperty()
    @IsDefined()
    @IsArray()
    @Transform(async ({ value }) => {
        for (const obj of value) {
            const product = await Product.findOneBy({ id: obj.productId });
            if (!product) {
                throw new HttpException(`Product with id: ${obj.productId} not found`, HttpStatus.NOT_FOUND);
            }
        }
        return value;
    })
    productIdAndQty: ProductIdAndQty[];

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['unpaid', 'paid'])
    paymentStatus: 'unpaid' | 'paid';

    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsIn(['cod', 'click', 'payme', 'apelsin'])
    paymentMethod: 'cod' | 'click' | 'payme' | 'apelsin';

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    note?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsIn(['pending', 'processing', 'ontheway', 'delivered', 'cancelled'])
    status?: 'pending' | 'processing' | 'ontheway' | 'delivered' | 'cancelled';

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    deliveryPrice?: number;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    deliveryAddress: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    deliveryPhone: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    refundRequestedAt?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    refundedAt?: Date;
}
