import { Contact, NullException, TypeContact } from "home";

export class TypeContact_Contact {

    readonly id: string;
    readonly dateCreation: Date;

    type: TypeContact;
    contact: Contact;
    details: string;

    private static num: number = 0;
    private constructor(type: TypeContact, contact: Contact, details: string) {
        const dte = new Date();
        this.id = TypeContact_Contact.num.toString().padStart(2, '0');
        this.dateCreation = dte;
        this.type = type;
        this.contact = contact;
        this.details = details;
    }

    public static Creer(type: TypeContact, contact: Contact, details: string): TypeContact_Contact | undefined {
        if (!type || !contact) {
            throw new NullException();
        }

        let retval: TypeContact_Contact | undefined = undefined
        retval = new TypeContact_Contact(type, contact, details);
        return retval;
    }

    public Modifier(typeC: TypeContact_Contact): TypeContact_Contact {
        this.type = typeC.type;
        this.contact = typeC.contact;
        this.details = typeC.details;
        return this;
    }

    public getType(): TypeContact{
        return this.type;
    }

    public getContact (): Contact {
        return this.contact;
    }

    public getDetail (): string {
        return this.details;
    }
}