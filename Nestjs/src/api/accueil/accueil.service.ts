import { Injectable } from '@nestjs/common';
import { DataG } from '../../../lesBases/DB_stock';
import { Accueil } from './Accueil';

@Injectable()
export class AccueilService {
    private static t_accueil: Accueil[] = DataG.t_accueil;


    FindAll(): Accueil[] {
        return AccueilService.t_accueil;
    }

    public FindOne(id: string): Accueil | string {
        let retval: Accueil | string = `Ce accueil [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in AccueilService.t_accueil) {

            const element: Accueil = AccueilService.t_accueil[n] as Accueil
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(accueil: Accueil): Accueil | string {

        const newvacc: Accueil | undefined = Accueil.Creer(accueil.demande, accueil.statut, accueil.infos);

        if (newvacc !== undefined) {
            AccueilService.t_accueil.push(newvacc)
        }

        return newvacc ? newvacc : 'no acccueil s made';
    }
    
    Modifier(id: string, accueil: Accueil): Accueil | string {

        const idx: number = AccueilService.t_accueil.findIndex((v) => v.id === id.padStart(2, '0'));
        AccueilService.t_accueil[idx].Modifier(accueil);
        return AccueilService.t_accueil[idx];

    }

    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = AccueilService.t_accueil.findIndex((v) => v.id === id.padStart(2, '0'));
        if (AccueilService.t_accueil[idx]) {
            AccueilService.t_accueil.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
