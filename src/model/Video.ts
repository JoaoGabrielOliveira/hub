import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:'videos'})
@Unique('video_unique_constraint', ['fileName', 'title', 'numberOrder'])
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

    setId(id : number) : Video {
        this.id = id;
        return this;
    }

    setIdShow(idShow : number) : Video {
        this.idShow = idShow;
        return this;
    }


    setFileName(fileName : string) : Video {
        this.fileName = fileName;
        return this;
    }

    setTitle(title : string) : Video {
        this.title = title;
        return this;
    }

    setNumberOrder(numberOrder : number) : Video {
        this.numberOrder = numberOrder;
        return this;
    }
}