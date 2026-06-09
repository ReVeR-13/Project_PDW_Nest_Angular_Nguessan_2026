import { Injectable } from '@nestjs/common';
import { MotifEntree } from './MotifEntree';
import { DataG } from '../../../../lesBases/DB_stock';

@Injectable()
export class MotifEntreeService {

    private static t_motif : MotifEntree[] = DataG.t_motifEntree;

    public FindAll(): MotifEntree[] {
        return MotifEntreeService.t_motif;
    }

    public FindUn(id: string): MotifEntree | string {
        let retval: MotifEntree | string = `Ce motif [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in MotifEntreeService.t_motif) {

            const element: MotifEntree = MotifEntreeService.t_motif[n] as MotifEntree
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(motif: MotifEntree): MotifEntree | string {
        const newmotif: MotifEntree | undefined = MotifEntree.Create(motif.libele, motif.details);

        if (newmotif !== undefined) {
            MotifEntreeService.t_motif.push(newmotif)
        }

        return newmotif ? newmotif : 'no motif made';
    }

    public Modifier(id: string, motif: MotifEntree): MotifEntree {
        const idx: number = MotifEntreeService.t_motif.findIndex((m) => m.id === id.padStart(2, '0'));
        MotifEntreeService.t_motif[idx].Modifier(motif.libele, motif.details);
        return MotifEntreeService.t_motif[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = MotifEntreeService.t_motif.findIndex((m) => m.id === id.padStart(2, '0'));
        if (MotifEntreeService.t_motif[idx]) {
            MotifEntreeService.t_motif.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
