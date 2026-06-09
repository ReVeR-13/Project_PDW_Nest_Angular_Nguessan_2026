export abstract class Mouvement{

    public details : string;
    readonly date : string;

    protected constructor(details: string){

        const dte : Date = new Date();
        this.date = dte.toLocaleDateString();
        this.details = details;
        
    }
 
}