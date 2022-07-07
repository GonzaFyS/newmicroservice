import {EntityRepository, Column, PrimaryGeneratedColumn, Repository} from "typeorm";
import { Items } from "../entity/Item";
import { Jobs } from "../entity/jobs";
 
@EntityRepository(Items)
export class ItemRepository extends Repository<Items> {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;
}

@EntityRepository(Jobs)
export class JobsRepository extends Repository<Jobs>{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}
