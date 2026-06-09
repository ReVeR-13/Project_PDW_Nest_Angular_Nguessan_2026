import { Injectable } from '@nestjs/common';
import { Demande } from './Demande';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { ModifierDemandeDto } from './dto/modifier-demande.dto';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class DemandeService {

    private static t_demande: Demande[] = DataG.t_demande;

    FindAll(): Demande[] {
        return DemandeService.t_demande;
        
    }

    FindOne(id: string): Demande | string {
        let retval: Demande | string = `Cette Demande [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in DemandeService.t_demande) {

            const element: Demande = DemandeService.t_demande[n] as Demande
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(demande: CreateDemandeDto): Demande | string {

        const newdemande: Demande | undefined = Demande.Creer(demande.id_contact,
            demande.type,
            demande.statut,
            demande.details);

        if (newdemande !== undefined) {
            DemandeService.t_demande.push(newdemande)
        }

        return newdemande ? newdemande : 'no demande made';
    }

    Modifier(id: string, demande:ModifierDemandeDto ): Demande | string {

        const idx: number = DemandeService.t_demande.findIndex((dm) => dm.id === id.padStart(2, '0'));
        DemandeService.t_demande[idx].Modifier(demande.id_contact,
            demande.type,
            demande.statut,
            demande.details,
            demande.dateFermerture);
        return DemandeService.t_demande[idx];
    }

    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = DemandeService.t_demande.findIndex((dm) => dm.id === id.padStart(2, '0'));
        if (DemandeService.t_demande[idx]) {
            DemandeService.t_demande.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
