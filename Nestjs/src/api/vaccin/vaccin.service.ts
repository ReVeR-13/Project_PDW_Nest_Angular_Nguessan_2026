import { Injectable } from '@nestjs/common';
import { Vaccin } from './Vaccins';
import { DataG } from '../../../lesBases/DB_stock';

@Injectable()
export class VaccinService {

    private static t_vaccin: Vaccin[] = DataG.t_vaccin;

    FindAll(): Vaccin[] {
        return VaccinService.t_vaccin;
    }

    public FindOne(id: string): Vaccin | string {
        let retval: Vaccin | string = `Ce vaccin [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in VaccinService.t_vaccin) {

            const element: Vaccin = VaccinService.t_vaccin[n] as Vaccin
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(vacc: Vaccin): Vaccin | string {

        const newvacc: Vaccin | undefined = Vaccin.Creer(vacc.nom, vacc.details);

        if (newvacc !== undefined) {
            VaccinService.t_vaccin.push(newvacc)
        }

        return newvacc ? newvacc : 'no vaccin made';
    }

    Modifier(id: string, vacc: Vaccin): Vaccin | string {

        const idx: number = VaccinService.t_vaccin.findIndex((v) => v.id === id.padStart(2, '0'));
        VaccinService.t_vaccin[idx].Modifier(vacc.nom, vacc.details);
        return VaccinService.t_vaccin[idx];

    }

    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = VaccinService.t_vaccin.findIndex((v) => v.id === id.padStart(2, '0'));
        if (VaccinService.t_vaccin[idx]) {
            VaccinService.t_vaccin.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
