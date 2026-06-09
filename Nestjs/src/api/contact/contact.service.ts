import { Injectable } from '@nestjs/common';
import { Contact } from './Contact'
import { ContactRepository } from './repository/contact.repository';
import { ContactReponseDto, ContactUpdateDto } from './dto';
import { ContactCreateDto } from './dto/contact-create.dto';
import { CreationFailException, DeleteFailException, NullException, UpdateFailException } from 'home';
import { isNil } from 'lodash';
import { ContactEntity } from './entity/contact.entity';

@Injectable()
export class ContactService {

    constructor(private readonly contactRepository: ContactRepository) { }

    private t_contact: ContactEntity[] = [];

    async GetAll(): Promise<Partial<ContactReponseDto>[]> {
        if (Object.keys(this.t_contact).length === 0) {
            this.t_contact = [
                ...(await this.contactRepository.findAll())
            ]
        }
        return this.t_contact;
    }

    async GetOne(id: string): Promise<Partial<ContactReponseDto> | null> {

        if (isNil(id)) {
            throw new NullException();
        }

        let retval: ContactEntity | null = this.t_contact.find(a => a.id === id)?? null;

        if (retval === undefined) {
            retval = await this.contactRepository.findById(id) as ContactEntity ;
            this.t_contact.push(retval)   
        }
        
        return retval;
    }

    async Create(contact: ContactCreateDto): Promise<Partial<ContactReponseDto>> {

        const newcontact: Contact | undefined = Contact.Create(contact.nom,
            contact.prenom,
            contact.dateNaissance,
            contact.niss,
            contact.gsm,
            contact.telephone,
            contact.mail,
            contact.localite,
            contact.codePostale,
            contact.rue);

        if (newcontact === undefined) {
            throw new CreationFailException()
        }

        const create_c = await this.contactRepository.add(newcontact.entity());
        if (isNil(create_c)) {
            throw new CreationFailException()
        }

        this.t_contact.push(create_c)

        return create_c;
    }

    async Modifier(id: string, contact: ContactUpdateDto): Promise<Partial<ContactReponseDto> | null> {

        const retval:ContactEntity | null = await this.contactRepository.update(id,contact);

        if(isNil(retval)){
            throw new UpdateFailException();
        }

        this.localSuppression(retval.id);
        this.t_contact.push(retval);
        return retval;

    }

    async Supprimer(id: string): Promise<1 | 0> {
        if (isNil(id)) {
            throw new NullException();
        }

        let x:1|0 = await this.contactRepository.delete(id);

        if (x === 0) {
            throw new DeleteFailException();
        }
        this.localSuppression(id);
        return x;
    }

    private localSuppression(id:string){
        const idx: number = this.t_contact.findIndex((contact) => contact.id === id);
        if (this.t_contact[idx]) {
            this.t_contact.splice(idx, 1);
        }
    }
}
