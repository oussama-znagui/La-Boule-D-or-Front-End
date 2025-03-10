import { City } from "./city";
import { Player } from "./player";
import { Table } from "./table";

export interface Club {
    id: number;
    name: string;
    adresse: string;
    fondationDate: Date;
    capacity: number;
    area: number;

    players: Player[];
    tables: Table[];

    city: City;
    
}

