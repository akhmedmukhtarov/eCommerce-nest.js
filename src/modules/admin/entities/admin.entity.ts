import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admin')
export class Admin extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: null})
    name: string

    @Column({unique: true})
    username: string

    @Column()
    hashedPassword: string

    @Column({default: null})
    hashedRefreshToken: string

    @Column({default: null})
    phone: string

    @Column({default: 'moderator'})
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}