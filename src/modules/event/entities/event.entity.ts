import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titleUz: string

    @Column()
    titleRu: string

    @Column()
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
