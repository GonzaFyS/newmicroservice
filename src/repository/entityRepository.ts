import {EntityRepository, Column, PrimaryGeneratedColumn, Repository} from "typeorm";
import { Items } from "../entity/Item";

@EntityRepository(Items)
export class ItemRepository extends Repository<Items> {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;
}