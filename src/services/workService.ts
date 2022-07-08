import { itemsEntry } from '../types';
import boom from '@hapi/boom';
import {  getCustomRepository } from 'typeorm';
import { JobsRepository } from '../repository/entityRepository';


export class workService {  
    
    constructor() {
    }

    async getWork(){
        // const connection = await getConnection();
        const itemsRepository = await getCustomRepository(JobsRepository);
        const work = itemsRepository.find();

        if(!work){
            throw boom.notFound(`Items not found`);
        } else{
            return work;
        }
    }

    async getWorkById(id: number): Promise<itemsEntry | undefined> {
        // const connection = await getConnection();
        const itemsRepository = await getCustomRepository(JobsRepository);

        const item = await itemsRepository.findOne({where:{id: id}});

        if(!item){
            throw boom.notFound(`Item ${id} not found`);
        } else{
            return item as itemsEntry;
        }
    }

    async modifyItem(id: number, text: string): Promise<itemsEntry | undefined> {
        // const connection = await getConnection();
        const itemsRepository = await getCustomRepository(JobsRepository);

        const item = await itemsRepository.findOne({where:{id: id}});

        if(!item){
            throw boom.notFound(`Item ${id} not found`);
        } else{
            (item as itemsEntry).text = text;
            await itemsRepository.save(item);
            return item as itemsEntry;
        }
    }

    async addItem(text: string): Promise<itemsEntry | undefined> {
        // const connection = await getConnection();
        const itemsRepository = await getCustomRepository(JobsRepository);

        if(text.length === 0){
            throw boom.badRequest('Missing text or invalid format');
        } else{
            const item = await itemsRepository.create({text: text});
            await itemsRepository.save(item);
            
            return item as itemsEntry;
        }
    }

    async deleteItem(id: number): Promise<itemsEntry | undefined> {
        // const connection = await getConnection();
        const itemsRepository = await getCustomRepository(JobsRepository);

        const item = await itemsRepository.findOne({where:{id: id}});

        if(!item){
            throw boom.notFound(`Item ${id} not found`);
        } else{
            await itemsRepository.remove(item);
            return item as itemsEntry;
        }
    }

  }