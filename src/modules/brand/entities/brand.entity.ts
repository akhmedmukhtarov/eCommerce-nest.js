import { Category } from "src/modules/category/entities/category.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique: false})
    nameUz: string

    @Column({unique: false})
    nameRu:string

    @Column({default: null})
    slug: string

    @Column({default: false})
    isFeatured: boolean

    @Column({default: 0})
    viewCount: number

    @Column({default: true})
    status: boolean

    @Column({type: 'text'})
    images: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(()=> Category,(category:Category)=> category.brands)
    @JoinTable()
    categories: Category[]

    @OneToMany(()=> Product,(product:Product)=> product.brand)
    products: Product[]
}
