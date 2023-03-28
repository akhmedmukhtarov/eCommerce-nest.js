import { Delivery } from "src/modules/order/entities/delivery.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @Column({unique: true})
    phone: string

    @Column()
    verificationCode: number

    @Column({default: false})
    isVerified:boolean
    
    @Column({default: null})
    hashedRefreshToken: string

    @OneToMany(()=> Delivery, (delivery: Delivery)=> delivery.user)
    delivery: Delivery[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date    
}