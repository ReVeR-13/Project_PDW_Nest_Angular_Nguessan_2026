import { Injectable } from '@nestjs/common';
import { Adoption } from 'home';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class AdoptionService {

    private static t_adoption: Adoption[] = DataG.t_adoption;
    

    FindAll(): Adoption[] {
        return AdoptionService.t_adoption; 
    }
    public FindOne(id: string): Adoption | string {
        let retval: Adoption | string = `Ce adoption [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in AdoptionService.t_adoption) {

            const element: Adoption = AdoptionService.t_adoption[n] as Adoption
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }
    Create(adoption: Adoption): Adoption | string {

        const newvacc: Adoption | undefined = Adoption.Creer(adoption.demande, adoption.statut,adoption.infos);

        if (newvacc !== undefined) {
            AdoptionService.t_adoption.push(newvacc)
        }

        return newvacc ? newvacc : 'no adoption made';
    }
    Modifier(id: string, adoption: Adoption): Adoption | string {

        const idx: number = AdoptionService.t_adoption.findIndex((v) => v.id === id.padStart(2, '0'));
        AdoptionService.t_adoption[idx].Modifier(adoption);
        return AdoptionService.t_adoption[idx];

    }
    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = AdoptionService.t_adoption.findIndex((v) => v.id === id.padStart(2, '0'));
        if (AdoptionService.t_adoption[idx]) {
            AdoptionService.t_adoption.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
    
}
