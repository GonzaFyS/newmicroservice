import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Items {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;
}