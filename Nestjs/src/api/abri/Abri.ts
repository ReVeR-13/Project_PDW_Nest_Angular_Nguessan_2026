import { Builder } from "api/security/utils";
import { AbriEntity } from "./entity/abri.entity";
import { isNil } from "lodash";
import { ParamInvalide } from "home";

export enum StatutAbri {
    DISPONIBLE = 'DISPONIBLE',
    OCCUPE = 'OCCUPE',
    HORS_SERVICE = 'HORS_SERVICE'
}

export class Abri {

    id: string;
    date: Date;

    libele: string;
    details: string;
    statut: StatutAbri;

    private static num: number = 0;
    private constructor(libele: string, details: string) {
        Abri.num++;
        this.date = new Date();
        this.libele = libele.trim().toUpperCase();
        this.details = details;
        this.statut = StatutAbri.DISPONIBLE;

        this.id = Abri.num.toString().padStart(2, '0')
    }

    public Modifier(libele: string, details: string, statut:StatutAbri): Abri {
        this.libele = libele;
        this.details = details;
        this.statut = statut;
        return this;
    }

    public static Creer(libele: string, details: string): Abri {

        let retval: Abri = new Abri(libele, details)
        return retval;
    }

    entity(): AbriEntity {

        return Builder.create<AbriEntity>()
            .set('id', this.id)
            .set('dateCreation', this.date)
            .set('nom', this.libele)
            .set('description', this.details)
            .set('statut', this.statut)
            .build()
    }

    static entityToMetier(entity?:AbriEntity):Abri{

        if (isNil(entity)) {
            throw new ParamInvalide();
        }

        let abri:Abri = new Abri(entity.nom, entity.description)
        abri.id = entity.id;
        abri.date = entity.dateCreation;
        abri.statut = entity.statut;

        return abri;
    }
}