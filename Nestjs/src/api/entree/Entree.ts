import { Demande } from "api/demande";
import { Mouvement } from "../../../lesBases";
import { MotifEntree } from "./motif-entree";

export class Entree extends Mouvement {
    private static _num: number = 0;
    readonly id: string;
    demande:Demande;
    motif:MotifEntree;

    private constructor(demande:Demande,motif:MotifEntree, details: string) {
        super(details);
        Entree._num++;
        this.id = Entree._num.toString().padStart(2, "0");
        this.demande = demande;
        this.motif=motif;
    }

    public Modifier( entree: Entree):void{
        this.demande = entree.demande
        this.details = entree.details
        this.motif = entree.motif;
    }

    public static Creer(demande:Demande,motif:MotifEntree ,detail: string):Entree {
        let retval: Entree = new Entree(demande,motif, detail);
        return retval;
    }
}