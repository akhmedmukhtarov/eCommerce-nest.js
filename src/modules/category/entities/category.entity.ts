import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @Column({unique: true})
    nameUz: string

    @Column({unique: true})
    nameRu: string

    @Column()
    images: string

    @Column()
    slug: string

    @Column({default: 0})
    parentId: number

    @Column({default: null})
    position: string

    @Column({default: 0})
    views: number

    @Column({default: false})
    isFeatured: boolean

    @Column({default: true})
    status: boolean
}