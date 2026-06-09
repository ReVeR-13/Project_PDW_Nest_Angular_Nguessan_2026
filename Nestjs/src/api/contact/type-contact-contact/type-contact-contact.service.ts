import { Injectable } from '@nestjs/common';
import { DataG } from '../../../../lesBases/DB_stock';
import { TypeContact_Contact } from './TypeContact_Contact';
import { TypeContact_ContactRepository } from './repository/type-contact-connexion.repository';

@Injectable()
export class TypeContactContactService {

    constructor(private readonly repo: TypeContact_ContactRepository){}

    private dataJson:TypeContact_Contact[] = DataG.t_typeContact_Contact;

    async GetAll(): Promise<TypeContact_Contact[]> {
        let rep  = await this.repo.findAll();
        for( let a in rep){
            console.log(a,rep[a]);
        }

        let retVal: TypeContact_Contact[] = [];
        for (const n in this.dataJson) {
            const element = this.dataJson[n] as TypeContact_Contact
            retVal.push(element)
        }
        return retVal;
    }

    GetOne(id: string): TypeContact_Contact | string {
        let retval: TypeContact_Contact | string = `Cette connexion [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in this.dataJson) {

            const element: TypeContact_Contact = this.dataJson[n] as TypeContact_Contact
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    Create(connexion: TypeContact_Contact): TypeContact_Contact | string {

        const newelement: TypeContact_Contact | undefined = TypeContact_Contact.Creer(connexion.type,
            connexion.contact,
            connexion.details,
            );

        if (newelement !== undefined) {
            this.dataJson.push(newelement)
        }

        return newelement ? newelement : 'no connexion s made';
    }

    Modifier(id: string, connexion: TypeContact_Contact): TypeContact_Contact | string {

        const idx: number = this.dataJson.findIndex((connexion) => connexion.id === id.padStart(2, '0'));
        this.dataJson[idx].Modifier(connexion);
        return this.dataJson[idx];

    }

    Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = this.dataJson.findIndex((connexion) => connexion.id === id.padStart(2, '0'));
        if (this.dataJson[idx]) {
            this.dataJson.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
