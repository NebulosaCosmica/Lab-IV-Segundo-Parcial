
import {Observable} from 'rxjs';

export class Mascota {

    animal:string;
    raza:string;
    nombre:string;
    edad:number;
    dueno:string;
    foto:string | Observable<any>;    
}
