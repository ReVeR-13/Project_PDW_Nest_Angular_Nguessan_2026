export class Vaccin{

    readonly id:string;
    readonly date: string;

    nom:string;
    details:string;

    private static num :number = 0;
    private constructor(nom:string,details:string){
        Vaccin.num ++;
        const dte = new Date();
        this.date = dte.toDateString();
        this.nom = nom;
        this.details = details;

        this.id = Vaccin.num.toString().padStart(2,'0')
    }

    public Modifier(nom:string,details:string):Vaccin{
        this.nom = nom;
        this.details = details;
        return this;
    }

    public static Creer(nom:string,details:string):Vaccin{

        let retval:Vaccin = new Vaccin(nom,details)
        return retval;
    }
}