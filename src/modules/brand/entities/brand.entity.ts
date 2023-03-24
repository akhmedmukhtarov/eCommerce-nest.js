import { Category } from "src/modules/category/entities/category.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nameUz: string

    @Column()
    nameRu:string

    @Column()
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

    @ManyToMany(()=> Category)
    @JoinTable()
    categories: Category[]


}
