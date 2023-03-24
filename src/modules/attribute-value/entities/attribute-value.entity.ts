import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttributeValue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=> Attribute, (attribute)=> attribute.values)
    attribute: Attribute

    @Column()
    nameUz:string

    @Column()
    nameRu: string
}
