import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: false})
    titleUz: string

    @Column({unique: false})
    titleRu: string

    @Column({default: null})
    slug: string

    @Column()
    image: string

    @Column()
    url:string

    @Column({nullable: true})
    position: string

    @Column({nullable: true})
    startsAt: Date

    @Column({nullable: true})
    endsAt: Date

}
