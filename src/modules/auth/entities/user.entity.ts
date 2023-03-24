import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date    
}