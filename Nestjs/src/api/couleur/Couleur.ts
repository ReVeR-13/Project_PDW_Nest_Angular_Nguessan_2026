import { idBuilder } from "api/security/utils";
import { NullException } from "home";
import { isNil } from "lodash";

export class Couleur {

    id:string;
    dateCreation:Date;
    nom:string;

    private constructor(nom:string){

        this.id = idBuilder('COL',3);
        this.dateCreation = new Date();

        this.nom = nom;
    }

    static create(nom:string):Couleur{

        if (isNil(nom)) {
            throw new NullException();
        }
        return new Couleur(nom);
    }

    modifier(nom:string):Couleur{
        
        if (isNil(nom)) {
            throw new NullException();
        }
        this.nom = nom;
        return this;

    }

}