import { User } from "src/modules/auth/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Delivery extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User,(user: User)=> user.delivery)
    user: User
    
    @Column()
    totalPrice: number

    @Column({default: null})
    note: string

    @OneToMany(()=> Order, (order: Order)=> order.delivery)
    orders: Order[]

    @Column({
        type: 'enum',
        enum: ['pending','processing', 'ontheway','delivered','canceled'],
        default: 'pending'
    })
    status: 'pending'|'processing'| 'onTheWay'|'delivered'|'canceled'

    @Column({default: null})
    deliveryPrice: number

    @Column()
    deliveryAddress: string 

    @Column()
    deliveryPhone: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}