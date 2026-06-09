export interface IContact{
    id:string;
    dateCreation:Date;
    dateNaissance:Date;
    nom:string;
    prenom:string;
    niss:string;
    gsm:string;
    telephone:string;
    mail:string;
    localite:string;
    codePostale:string;
    rue:string;
    isEmpty:boolean;
    //roles: TypeContactConnexionEntity[];
    //demande:DemandeEntity[];
}