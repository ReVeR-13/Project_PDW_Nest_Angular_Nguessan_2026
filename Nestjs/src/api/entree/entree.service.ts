import { Injectable } from '@nestjs/common';
import { Entree } from './Entree';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class EntreeService {

    private static t_entree: Entree[] = DataG.t_entree;

    public FindAll(): Entree[] {
        return EntreeService.t_entree;
    }

    public FindUn(id: string): Entree | string {
        let retval: Entree | string = `Ce entree [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in EntreeService.t_entree) {

            const element: Entree = EntreeService.t_entree[n] as Entree
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(entree: Entree): Entree | string {
        const newentree: Entree | undefined = Entree.Creer(entree.demande,entree.motif ,entree.details);

        if (newentree !== undefined) {
            EntreeService.t_entree.push(newentree)
        }

        return newentree ? newentree : 'no Entry made';
    }

    public Modifier(id: string, entree: Entree): Entree {
        const idx: number = EntreeService.t_entree.findIndex((m) => m.id === id.padStart(2, '0'));
        EntreeService.t_entree[idx].Modifier(entree);
        return EntreeService.t_entree[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = EntreeService.t_entree.findIndex((m) => m.id === id.padStart(2, '0'));
        if (EntreeService.t_entree[idx]) {
            EntreeService.t_entree.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
