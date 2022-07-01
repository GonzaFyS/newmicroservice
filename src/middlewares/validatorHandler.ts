// import {createItemSchema, updateItemSchema, getItemSchema } from '../schemas/itemSchema';
import boom from '@hapi/boom';

export const validatorHandler = (schema: any, property: any) => {
    return (req: any, _res: any, next: any) => {
        const data = req[property]
        const { error } = schema.validate(data);
        
        if(error){
            next(boom.badRequest(error));
        } else{
            next();
        }
    }
}