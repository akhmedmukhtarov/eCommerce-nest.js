import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsDefined,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
    ValidatePromise,
} from 'class-validator';

import { HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/modules/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

class ProductIdAndQty {
    @ApiProperty({type: "number", example: 0})
    @IsNotEmpty()
    @IsInt()
    @ValidatePromise()
    @Transform(async ({ value }) => {
        try {
            const product = await Product.findOneBy({ id: +value });
            if (!product) {
                throw new HttpException(`Product with id: ${+value} not found`, HttpStatus.NOT_FOUND);
            }
            return value;
        } catch (error) {
            throw error;
        }
    })
    productId: Promise<number>;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    qty: number;
}

export class CreateOrderDto {
    @ApiProperty({type: [ProductIdAndQty]})
    @IsNotEmpty()
    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductIdAndQty)
    productIdAndQty: ProductIdAndQty[];

    @ApiProperty({example: 'unpaid|paid'})
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['unpaid', 'paid'])
    paymentStatus: 'unpaid' | 'paid';

    @ApiProperty({example: "'cod' | 'click' | 'payme' | 'apelsin'"})
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

    @ApiProperty({example: "'pending' | 'processing' | 'ontheway' | 'delivered' | 'cancelled'"})
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
