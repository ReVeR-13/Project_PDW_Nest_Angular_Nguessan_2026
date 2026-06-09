
// [contact.type.ts] contact.type.ts
/*export interface Contact{
    idContact:string;
    dateCreation:Date;
    nom:string;
    prenom:string;
    niss?:string;
    gsm:string;
    tel?:string;
    mail?:string;
    adresse:string;
    typeContact:string
}*/


export abstract class Type{

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



