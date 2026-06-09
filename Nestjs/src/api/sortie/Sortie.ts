import { Demande } from "api/demande";
import { Mouvement } from "../../../lesBases";
import { MotifSortie } from "./motif-sortie";

export class Sortie extends Mouvement {
    private static _num: number = 0;
    readonly id: string;
    demande:Demande;
    motif:MotifSortie;

    private constructor(demande:Demande,motif:MotifSortie ,details: string) {
        super(details);
        Sortie._num++;
        this.id = Sortie._num.toString().padStart(2, "0");
        this.demande = demande;
        this.motif = motif;
    }

    public Modifier( sortie: Sortie):void{
        this.demande = sortie.demande;
        this.details = sortie.details;
        this.motif = sortie.motif;
    }

    public static Creer(demande:Demande,motif:MotifSortie ,detail: string):Sortie{
        let retval: Sortie = new Sortie(demande,motif ,detail);
        return retval;
    }
}