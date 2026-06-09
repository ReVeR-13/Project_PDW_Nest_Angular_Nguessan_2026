import { Demande, StatutValidation } from "api/demande";

export class Accueil {
    private static _num: number = 0;
    readonly id: string;
    readonly date: Date;

    infos: string;
    statut: StatutValidation
    demande: Demande;

    private constructor(demande: Demande, statut: StatutValidation, infos: string) {
        Accueil._num++;
        const dte = new Date();
        this.id = Accueil._num.toString().padStart(2, "0");
        this.demande = demande;
        this.date = dte;
        this.infos = infos;
        this.statut = statut;
    }

    public Modifier(accueil: Accueil): void {
        this.demande = accueil.demande;
        this.infos = accueil.infos;
        this.statut = accueil.statut;
    }

    public static Creer(demande: Demande, statut: StatutValidation, infos: string): Accueil {
        let retval: Accueil = new Accueil(demande, statut, infos);
        return retval;
    }
}