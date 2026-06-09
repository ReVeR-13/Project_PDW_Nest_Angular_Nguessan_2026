
import { IContact } from "../component";
import { ContactDto } from "../dto/contact.dto";

export class ContactUtils {

    static fromDto(data: ContactDto): IContact {
        return {
            id: data.id,
            dateCreation: data.dateCreation,
            dateNaissance: data.dateNaissance,
            nom: data.nom,
            prenom: data.prenom,
            niss: data.niss,
            gsm: data.gsm,
            telephone: data.telephone,
            mail: data.mail,
            localite: data.localite,
            codePostale: data.codePostale,
            rue: data.rue,
            isEmpty: false
        }
    }

    static getEmpty(): IContact {
        return {
        id: '',
        dateCreation: new Date(),
        dateNaissance: new Date(),
        nom: '',
        prenom: '',
        niss: '',
        gsm: '',
        telephone: '',
        mail: '',
        localite: '',
        codePostale: '',
        rue: '',
        isEmpty: true
        }
    }
}