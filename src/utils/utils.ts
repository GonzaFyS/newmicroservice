import {NewItemEntry} from '../types';
import boom from '@hapi/boom';

const isValidText = (textFromRequest: any): boolean => {
    if (typeof textFromRequest === 'string') {
        return true;
    } else{
        return false;
    }
    
}

export const toNewItemEntry = (object: any): NewItemEntry => {
    if(isValidText(object.text)){
        const newEntry: NewItemEntry = {
            text: (object.text)
        };
        return newEntry;
    } else{
        throw boom.badRequest('Missing text, invalid text, or invalid request format. Format must be: "text": "example"');
    }
}
