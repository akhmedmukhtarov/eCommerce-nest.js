import { AttributeValue } from './../../attribute-value/entities/attribute-value.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Attribute extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(()=> AttributeValue, (attributeValue)=> attributeValue.attribute)
    values: AttributeValue[]

    @Column()
    nameUz: string

    @Column()
    nameRu: string

    @Column()
    slug: string

    @Column({default: true})
    isFilterable: boolean
}
