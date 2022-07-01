import Joi from 'joi';

const id = Joi.number().integer().min(1);
const text = Joi.string().min(1).max(50);

export const createItemSchema = Joi.object({
    text: text.required()
})

export const updateItemSchema = Joi.object({
    text: text.required()
})

export const getItemSchema = Joi.object({
    id: id.required()
})
