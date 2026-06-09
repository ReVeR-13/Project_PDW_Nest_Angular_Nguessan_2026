

export enum StatutDemande {
    EXAMINATION = 'EXAMINATION',
    EN_COURS = 'EN_COURS',
    VALIDATION = 'VALIDATION',
    TERMINEE = 'TERMINEE',
    CLOTUREE = 'CLOTUREE',
    ANNULEE = 'ANNULEE'
}

export enum TypeDemande {
    ENTREE = 'ENTREE',
    SORTIE = 'SORTIE',
    ADOPTION = 'ADOPTION',
    ACCUEIL = 'ACCUEIL',
    INFO = 'INFO'
}

export enum StatutValidation {
    'ACCEPTEE',
    'REFUSEE',
    'EN_COURS'
}

export class Demande {

    readonly id: string;
    readonly dateOuverture: Date;

    dateFermerture?: Date | undefined;
    protected idanimal?: string | undefined;
    idcontact: string;
    type: TypeDemande;
    statut: StatutDemande;
    details: string;

    private static num: number = 0;
    private constructor(contact: string, type: TypeDemande, statut: StatutDemande, details: string) {
        const dte = new Date();
        Demande.num++;
        this.id = Demande.num.toString().padStart(2, '0');
        this.dateOuverture = dte;
        this.idcontact = contact;
        this.type = type;
        this.statut = statut;
        this.details = details;

        this.idanimal = undefined;
        this.dateFermerture = undefined;
    }

    public Modifier(contact: string, type: TypeDemande, statut: StatutDemande, details: string, dateFermerture: Date): Demande {
        this.idcontact = contact;
        this.type = type;
        this.statut = statut;
        this.details = details;
        this.dateFermerture = dateFermerture;

        return this;
    }

    public Animal(animal: string) {
        this.idanimal = animal;
    }

    public static Creer(contact: string, type: TypeDemande, statut: StatutDemande, details: string): Demande | undefined {
        let retval: Demande | undefined = undefined
        retval = new Demande(contact, type, statut, details);
        return retval;
    }
}