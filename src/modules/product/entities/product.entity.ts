
import { Category } from 'src/modules/category/entities/category.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';


@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameUz: string;

    @Column()
    nameRu: string;

    @Column()
    slug: string;

    @Column({ default: null })
    descShortUz: string;

    @Column({ default: null })
    descShortRu: string;

    @Column({ type: 'text', default: null })
    descriptionUz: string;

    @Column({ type: 'text', default: null })
    descriptionRu: string;

    @Column({ type: 'bigint' })
    price: number;

    @Column({ default: false })
    isFeatured: boolean;

    @Column({ default: false })
    isPopular: boolean;

    @Column({ default: false })
    isNew: boolean;

    @Column({ type: 'text' })
    images: string;

    @Column({ type: 'bigint', default: null })
    discount: number;

    @ManyToMany(() => Category,(category: Category)=> category.products)
    @JoinTable()
    categories: Category[];


    @ManyToMany((() => AttributeValue), (attrValue: AttributeValue) => attrValue.products)
    @JoinTable()
    attributeValues: AttributeValue[]


    @Column({ default: 0 })
    viewCount: number;

    @Column({ default: 0 })
    orderCount: number;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Order,(order: Order)=> order.product)
    orders: Order[]

    @ManyToOne(()=> Brand,(brand:Brand)=> brand.products)
    brand: Brand


}
