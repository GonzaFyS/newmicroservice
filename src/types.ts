export interface itemsEntry {
    id: number,
    text: string
}
export type NewItemEntry = Omit<itemsEntry, 'id'>;