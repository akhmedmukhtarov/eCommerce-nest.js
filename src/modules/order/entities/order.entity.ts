
import { Product } from 'src/modules/product/entities/product.entity';
import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from 'typeorm';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery } from './delivery.entity';
@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number

    @Column({
        type: 'enum',
        enum: ['paid', "unpaid"],
        default: 'unpaid'
    })
    paymentStatus: "paid"|"unpaid"

    @Column({
        type: "enum",
        enum: ["cod", "click", "payme", "apelsin"],
        default: 'cod'
    })
    paymentMethod: 'cod'| "click" | "payme" | "apelsin"

    @ManyToOne(()=> Delivery, (delivery: Delivery)=> delivery.orders)
    delivery: Delivery

    @OneToOne(()=> Product)
    @JoinColumn()
    product: Product

    @Column({default: 1})
    qty: number

    @Column({default: null})
    refundRequestedAt: Date

    @Column({default: null})
    refundedAt: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
