import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'shows'})
export class Show extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    pathFolder: string
}
