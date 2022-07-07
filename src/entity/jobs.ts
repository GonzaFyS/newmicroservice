import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Jobs {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}