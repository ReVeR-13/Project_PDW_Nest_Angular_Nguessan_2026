export abstract class Motif{

    public libele: string;
    public details : string;
    readonly date : string;

    protected constructor(libele: string, details: string){

        const dte : Date = new Date();
        this.date = dte.toLocaleDateString();
        this.libele = libele;
        this.details = details;
        
    }
 
    public Modifier(libele: string, details: string){
        this.libele = libele;
        this.details = details
    }
}