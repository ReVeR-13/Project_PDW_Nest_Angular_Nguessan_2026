import { isNil } from "lodash";
import { ContactEntity } from "./entity/contact.entity";
import { ParamInvalide } from "home";
import { Builder } from "api/";
import { TypeContactConnexionEntity } from "./type-contact-contact/entity/type-contact-connexion.entity";
import { DemandeEntity } from "api/demande/Entity/demande.entity";

export class Contact {

    id: string;
    dateCreation: Date;
    dateNaissance: Date;
    nom: string;
    prenom: string;
    niss: string;
    gsm: string;
    tel: string;
    mail: string;
    localite: string;
    codePostale: string;
    adresse: string;
    roles: TypeContactConnexionEntity[];
    demande:DemandeEntity[];

    private static _num: number = 3;

    private constructor(nom: string, prenom: string,dteN:Date ,niss: string, gsm: string, tel: string, mail: string, localite: string, cp: string, adresse: string) {
        Contact._num++;
        this.id = Contact._num.toString().padStart(2, '0');
        this.dateCreation = new Date();
        this.nom = nom;
        this.prenom = prenom;
        this.niss = niss;
        this.gsm = gsm;
        this.tel = tel;
        this.mail = mail;
        this.localite = localite;
        this.codePostale = cp;
        this.adresse = adresse;
        this.dateNaissance=dteN;
        this.roles = [];
        this.demande =[];
    }

    public static Create(nom: string, prenom: string,dteN:Date, niss: string, gsm: string, tel: string, mail: string, localite: string, cp: string, adresse: string): Contact | undefined {
        let retVal: Contact | undefined = undefined;
        retVal = new Contact(nom, prenom,dteN, niss, gsm, tel, mail, localite, cp, adresse,)
        return retVal;
    }

    public Modifier(nom: string, prenom: string,dteN:Date ,niss: string, gsm: string, tel: string, mail: string, localite: string, cp: string, adresse: string): Contact {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dteN;
        this.niss = niss;
        this.gsm = gsm;
        this.tel = tel;
        this.mail = mail;
        this.localite = localite;
        this.codePostale = cp;
        this.adresse = adresse;

        return this;
    }

    entity(): ContactEntity {

        return Builder.create<ContactEntity>()
            .set('id', this.id)
            .set('dateCreation', this.dateCreation)
            .set('nom', this.nom)
            .set('prenom', this.prenom)
            .set('dateNaissance', this.dateNaissance)
            .set('niss', this.niss)
            .set('gsm', this.gsm)
            .set('telephone', this.tel)
            .set('mail', this.mail)
            .set('localite', this.localite)
            .set('codePostale', this.codePostale)
            .set('rue', this.adresse)
            .build()
    }

    static entityToMetier(entity?: ContactEntity): Contact {

        if (isNil(entity)) {
            throw new ParamInvalide();
        }

        let contact: Contact = new Contact(entity.nom, entity.prenom,entity.dateNaissance,
        entity.niss, entity.gsm, entity.telephone, entity.mail,entity.localite,entity.codePostale ,entity.rue);

        contact.id = entity.id;
        contact.dateCreation = entity.dateCreation;

        return contact;
    }
}