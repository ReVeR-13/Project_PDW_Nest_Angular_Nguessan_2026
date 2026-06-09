import { Injectable } from '@nestjs/common';
import { MotifSortie } from './MotifSortie';
import { DataG } from '../../../../lesBases/DB_stock';

@Injectable()
export class MotifSortieService {

    private static t_motif: MotifSortie[] = DataG.t_motifSortie;

    public FindAll(): MotifSortie[] {
        return MotifSortieService.t_motif;
    }

    public FindUn(id: string): MotifSortie | string {
        let retval: MotifSortie | string = `Ce motif [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in MotifSortieService.t_motif) {

            const element: MotifSortie = MotifSortieService.t_motif[n] as MotifSortie
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(motif: MotifSortie): MotifSortie | string {
        const newmotif: MotifSortie | undefined = MotifSortie.Create(motif.libele, motif.details);

        if (newmotif !== undefined) {
            MotifSortieService.t_motif.push(newmotif)
        }

        return newmotif ? newmotif : 'no motif made';
    }

    public Modifier(id: string, motif: MotifSortie): MotifSortie {
        const idx: number = MotifSortieService.t_motif.findIndex((m) => m.id === id.padStart(2, '0'));
        MotifSortieService.t_motif[idx].Modifier(motif.libele, motif.details);
        return MotifSortieService.t_motif[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = MotifSortieService.t_motif.findIndex((m) => m.id === id.padStart(2, '0'));
        if (MotifSortieService.t_motif[idx]) {
            MotifSortieService.t_motif.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
