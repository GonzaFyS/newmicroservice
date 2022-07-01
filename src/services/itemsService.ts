// import { itemsEntry } from '../types';
// // import itemsData from './items';
// import boom from '@hapi/boom';


// // const items: itemsEntry[] = itemsData as itemsEntry[];
// // const pool = getPoolConnection();

// export const getItems = async() => items;
// // {
// //     const items = await itemsRepository.find()
// //     return items;
// // };
// // {
// //     const result = (await pool).query('SELECT * FROM items');
// //     console.log((await result).rows);
// //     return (await result).rows;
// // };

// export const findItemById = (id: number) => {
//     if(id === undefined){
//         throw boom.notFound(`Item ${id} not found`);
//     }else {
//         const entry = items.find(item => item.id === id);
//         if (entry) {
//             return entry;
//         } else {
//             throw boom.notFound(`Item ${id} not found`);
//         }
//     }
// }

// export const modifyItem = (id: number, text: string) => {
//     const entry = findItemById(id);
//     if (entry !== undefined) {
//         (entry as itemsEntry).text = text;
//     } else{

//         throw boom.badRequest()
//     }
        
//     return entry;
// }

// export const addItem = async(text: string) => {
//     if(text.length === 0){

//         throw boom.badRequest('Missing text');

//     } else{
//         const newItem: itemsEntry = {
//         id: Math.max(...items.map(d => d.id)) + 1,
//         text: text,
//         }
//         items.push(newItem);

//         return newItem;
//     }
// }; 

// export const deleteItem = (id: number) => {
//     if(!id){

//         throw boom.notFound(`Item ${id} not found`);

//     } else {
//         const item = findItemById(id);
//         const index = items.indexOf(item as itemsEntry);
//         items.splice(index, 1);

//         return item;
//     }
// }

