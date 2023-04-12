import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { Brand } from "src/modules/brand/entities/brand.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @Column({unique: true})
    nameUz: string

    @Column({unique: true})
    nameRu: string

    @Column({default:null})
    images: string

    @Column({default:null})
    slug: string

    @Column({default: 0})
    parentId: number

    @Column({default: null})
    position: string

    @Column({default: 0})
    views: number

    @ManyToMany(()=>Attribute, (attribute: Attribute)=> attribute.categories)
    @JoinTable()
    attributes: Attribute[]

    @ManyToMany(()=> Brand,(brand:Brand)=> brand.categories)
    brands: Brand[]

    @ManyToMany(()=> Product, (product: Product)=> product.categories )
    products: Product[]

    @Column({default: false})
    isFeatured: boolean

    @Column({default: true})
    status: boolean
}