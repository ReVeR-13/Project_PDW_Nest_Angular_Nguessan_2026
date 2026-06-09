import { Injectable } from '@nestjs/common';
import { AnimalCompatibilite } from './AnimalCompatibilite';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class AnimalCompatibiliteService {

    //constructor(private readonly repo: TypeContact_ContactRepository) { }

    private dataJson: AnimalCompatibilite[] = DataG.t_animal_compatibilite;

    async GetAll(): Promise<AnimalCompatibilite[]> {

        let retVal: AnimalCompatibilite[] = [];
        for (const n in this.dataJson) {
            const element = this.dataJson[n] as AnimalCompatibilite
            retVal.push(element)
        }
        return retVal;
    }

    GetOne(id: string): AnimalCompatibilite | string {
        let retval: AnimalCompatibilite | string = `Cette connexion [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in this.dataJson) {

            const element: AnimalCompatibilite = this.dataJson[n] as AnimalCompatibilite
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(connexion: AnimalCompatibilite): AnimalCompatibilite | string {

        const newelement: AnimalCompatibilite | undefined = AnimalCompatibilite.Creer(connexion.animal,
            connexion.Compatibilite,
            connexion.remaque,
            connexion.valeur
        );

        if (newelement !== undefined) {
            this.dataJson.push(newelement)
        }

        return newelement ? newelement : 'no connexion s made';
    }

    Modifier(id: string, connexion: AnimalCompatibilite): AnimalCompatibilite | string {

        const idx: number = this.dataJson.findIndex((connexion) => connexion.id === id.padStart(2, '0'));
        this.dataJson[idx].Modifier(connexion);
        return this.dataJson[idx];

    }

    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = this.dataJson.findIndex((connexion) => connexion.id === id.padStart(2, '0'));
        if (this.dataJson[idx]) {
            this.dataJson.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
