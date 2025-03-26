import { City } from "./city";
import { Tournament } from "./tournament";

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    cin: string;
    city: City;
    profileImage: string
    tournaments?: Tournament[]
    
    

}

