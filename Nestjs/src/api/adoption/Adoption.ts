import { Demande, StatutValidation } from "api/demande/Demande";

export class Adoption {
    private static _num: number = 0;
    readonly id: string;
    readonly date:Date;
    infos: string;
    statut : StatutValidation
    demande:Demande;

    private constructor(demande:Demande,statut:StatutValidation ,infos: string) {
        Adoption._num++;
        const dte = new Date();
        this.id = Adoption._num.toString().padStart(2, "0");
        this.demande = demande;
        this.date = dte;
        this.infos = infos;
        this.statut = statut;
    }

    public Modifier( adoption: Adoption):void{
        this.demande = adoption.demande;
        this.infos = adoption.infos;
        this.statut = adoption.statut;
    }

    public static Creer(demande:Demande,statut:StatutValidation ,infos: string):Adoption {
        let retval: Adoption = new Adoption(demande,statut ,infos);
        return retval;
    }
}