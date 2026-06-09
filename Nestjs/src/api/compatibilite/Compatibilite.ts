export class Compatibilite {

    readonly id:string;
    readonly date: string;

    nom:string;
    details:string;

    private static num :number = 0;
    private constructor(nom:string,details:string){
        Compatibilite.num ++;
        const dte = new Date();
        this.date = dte.toDateString();
        this.nom = nom;
        this.details = details;

        this.id = Compatibilite.num.toString().padStart(2,'0')
    }

    public Modifier(nom:string,details:string):Compatibilite{
        this.nom = nom;
        this.details = details;
        return this;
    }

    public static Creer(nom:string,details:string):Compatibilite{

        let retval:Compatibilite = new Compatibilite(nom,details)
        return retval;
    }
}