import { Item } from './Item';

export class Point {
    [x: string]: any;
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    uf: string;
    city: string;
    latitude: number;
    longitude: number;
    items: Item[] = [];
    image: string;
}
