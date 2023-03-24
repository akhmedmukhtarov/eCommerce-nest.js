import { Category } from 'src/modules/category/entities/category.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameUz: string

    @Column()
    nameRu: string

    @Column()
    slug: string

    @Column({default: null})
    descShortUz: string

    @Column({default: null})
    descShortRu: string

    @Column({type: 'text',default:null})
    descriptionUz: string

    @Column({type: 'text',default:null})
    descriptionRu: string

    @Column()
    quantity: number

    @Column({type: 'bigint'})
    price: number

    @Column({default: false})
    isFeatured: boolean

    @Column({default: false})
    isPopular: boolean

    @Column({default: false})
    isNew: boolean

    @Column({type: 'text'})
    images: string

    @Column({type: 'bigint',default: null})
    discount: number

    @ManyToMany(()=> Category)
    @JoinTable()
    categories: Category[]

    @Column({default: 0})
    viewCount: number

    @Column({default: 0})
    orderCount: number

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date




}
