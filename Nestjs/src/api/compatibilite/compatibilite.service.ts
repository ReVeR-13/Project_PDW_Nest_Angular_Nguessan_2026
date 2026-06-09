import { Injectable } from '@nestjs/common';
import {Compatibilite} from './Compatibilite'
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class CompatibiliteService {

    private static t_compatibilite: Compatibilite[] = DataG.t_compatibilite;

    FindAll(): Compatibilite[] {
       return CompatibiliteService.t_compatibilite;
    }

    FindOne(id: string): Compatibilite | string {
        let retval: Compatibilite | string = `Cette compatibilité [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in CompatibiliteService.t_compatibilite) {

            const element: Compatibilite = CompatibiliteService.t_compatibilite[n] as Compatibilite
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(comp: Compatibilite): Compatibilite | string {

        const newcpm: Compatibilite | undefined = Compatibilite.Creer(comp.nom,comp.details);

        if (newcpm !== undefined) {
            CompatibiliteService.t_compatibilite.push(newcpm)
        }

        return newcpm ? newcpm : 'no compatibilite made';
    }

    Modifier(id: string, cpm: Compatibilite): Compatibilite | string {

        const idx: number = CompatibiliteService.t_compatibilite.findIndex((c) => c.id === id.padStart(2, '0'));
        CompatibiliteService.t_compatibilite[idx].Modifier(cpm.nom,cpm.details);
        return CompatibiliteService.t_compatibilite[idx];

    }

    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = CompatibiliteService.t_compatibilite.findIndex((c) => c.id === id.padStart(2, '0'));
        if (CompatibiliteService.t_compatibilite[idx]) {
            CompatibiliteService.t_compatibilite.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
