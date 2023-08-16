import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Show } from "./Show";

@Entity({name:'videos'})
export default class Video extends BaseEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    idShow : number;

    @Column()
    fileName : string;

    @Column()
    title : string;

    @Column('int8')
    numberOrder : number;
}