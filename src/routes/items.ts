import express from 'express';
// import * as itemsService from '../services/itemsService';
import { toNewItemEntry } from '../utils/utils';
// import { getConnection } from 'typeorm';
// import { Items } from '../entity/Item';
// import { Request, Response } from 'express';
// import { TryPostgreSQLConnection } from '../../libs/dbConnection';
import { dbItemsService } from '../services/dbItemsService';
import { createItemSchema, getItemSchema } from '../schemas/itemSchema';
import {validatorHandler} from '../middlewares/validatorHandler';

const router = express.Router();
const ItemsService = new dbItemsService;

  
router.get('/',
    async(_req, res, next) => {
        try{
            res.json(await ItemsService.getItems());
        } catch(err){
            next(err)
        }
    }
)

router.get('/:id', 
    validatorHandler(getItemSchema, 'params'),
    async (req, res, next) => {
        try{
            const id = Number(req.params.id);
            const item = await ItemsService.getItemById(id);
            res.send(item) 
        }   catch(err){
            next(err)
        }
    }
)
         
router.post('/', 
    validatorHandler(createItemSchema, 'body'),    
    async (req, res, next) => {
        try{
            const newItemEntry = toNewItemEntry(req.body);
            const addedItem = await ItemsService.addItem(newItemEntry.text);
            res.send(addedItem)
        } catch(err){
            next(err)
        }  
    }
)

router.delete('/:id', 
    validatorHandler(getItemSchema, 'params'),
    async(req, res, next) => {
        try{   
            const id = Number(req.params.id);
            const deletedItem = await ItemsService.deleteItem(id);

            res.json(deletedItem);
        } catch(err){
            next(err)
        }
    }
)
router.delete('/', 
    validatorHandler(getItemSchema, 'params')
)

router.patch('/:id', 
    validatorHandler(getItemSchema, 'params'),
    validatorHandler(createItemSchema, 'body'),
    async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            const { text } = req.body;

            const modifiedItem = await ItemsService.modifyItem(id, text);
            res.json(modifiedItem);
        } catch(err){
            next(err)
        }
    }
)
router.patch('/', 
    validatorHandler(getItemSchema, 'params')
)

export default router;