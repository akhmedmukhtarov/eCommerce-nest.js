import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttributeValue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=> Attribute, (attribute)=> attribute.values)
    attribute: Attribute

    @ManyToMany(()=> Product, (product)=> product.attributeValues)
    products: Product[]

    @Column({default: null})
    slug: string

    @Column()
    nameUz:string

    @Column()
    nameRu: string
}
