import { Injectable } from '@nestjs/common';
import { AnimalVaccin } from './AnimalVaccin';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class AnimalVaccinService {

    private dataJson: AnimalVaccin[] = DataG.t_animal_vaccin;

    async GetAll(): Promise<AnimalVaccin[]> {

        let retVal: AnimalVaccin[] = [];
        for (const n in this.dataJson) {
            const element = this.dataJson[n] as AnimalVaccin
            retVal.push(element)
        }
        return retVal;
    }

    GetOne(id: string): AnimalVaccin | string {
        let retval: AnimalVaccin | string = `Cette connexion [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in this.dataJson) {

            const element: AnimalVaccin = this.dataJson[n] as AnimalVaccin
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(connexion: AnimalVaccin): AnimalVaccin | string {

        const newelement: AnimalVaccin | undefined = AnimalVaccin.Creer(connexion.animal,
            connexion.vaccin,
            connexion.remaque,
        );

        if (newelement !== undefined) {
            this.dataJson.push(newelement)
        }

        return newelement ? newelement : 'no connexion s made';
    }

    Modifier(id: string, connexion: AnimalVaccin): AnimalVaccin | string {

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
