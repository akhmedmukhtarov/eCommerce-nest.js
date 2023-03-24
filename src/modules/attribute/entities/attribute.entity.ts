import { JoinTable, ManyToMany } from 'typeorm';
import { AttributeValue } from './../../attribute-value/entities/attribute-value.entity';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/modules/product/entities/product.entity';

@Entity()
export class Attribute extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => AttributeValue,
        (attributeValue) => attributeValue.attribute,
    )
    values: AttributeValue[];

    @ManyToMany(()=> Product)
    @JoinTable()
    products: Product[]


    @Column()
    nameUz: string;

    @Column()
    nameRu: string;

    @Column()
    slug: string;

    @Column({ default: true })
    isFilterable: boolean;
}
