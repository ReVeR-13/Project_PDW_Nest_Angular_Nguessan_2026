import { Injectable } from '@nestjs/common';
import { Sortie } from './Sortie';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class SortieService {

    private static t_sortie: Sortie[] = DataG.t_sortie;

    public FindAll(): Sortie[] {
        return SortieService.t_sortie;
    }

    public FindUn(id: string): Sortie | string {
        let retval: Sortie | string = `Cette sortie [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in SortieService.t_sortie) {

            const element: Sortie = SortieService.t_sortie[n] as Sortie
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(sortie: Sortie): Sortie | string {
        const newsortie: Sortie | undefined = Sortie.Creer(sortie.demande,sortie.motif,sortie.details);

        if (newsortie !== undefined) {
            SortieService.t_sortie.push(newsortie)
        }

        return newsortie ? newsortie : 'no sortie made';
    }

    public Modifier(id: string, sortie: Sortie): Sortie {
        const idx: number = SortieService.t_sortie.findIndex((m) => m.id === id.padStart(2, '0'));
        SortieService.t_sortie[idx].Modifier(sortie);
        return SortieService.t_sortie[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = SortieService.t_sortie.findIndex((m) => m.id === id.padStart(2, '0'));
        if (SortieService.t_sortie[idx]) {
            SortieService.t_sortie.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
