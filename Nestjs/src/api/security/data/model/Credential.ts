import { Builder } from "api/security/utils/entity.builder";
import { idBuilderWithUlid } from "api/security/utils/id.builder";
import { encryptPassword } from "api/security/utils/password.decoder";
import { CredentialEntity } from "../entity/credential.entity";
import { NullException } from "home";
import { isNil } from "lodash";

export class Credential {

    id: string;

    username: string;
    password: string;
    mail: string;

    isAdmin: boolean;
    active: boolean;

    created: Date;
    updated: Date;

    description: string;

    private constructor(user: string, passwordEncript: string, mail: string, description:string) {
        this.id = idBuilderWithUlid();
        this.created = new Date();
        this.updated = this.created;

        this.username = user;
        this.password = passwordEncript;
        this.mail = mail;

        this.isAdmin = false;
        this.active = false;

        this.description = description

    }

    public static async create(user: string, password: string, mail: string,description:string): Promise<Credential> {

        if (isNil(user) || isNil(password) || isNil(mail)) {
            throw new NullException();
        }
        const cripted: string = await encryptPassword(password);
        return new Credential(user, cripted, mail, description);
    }

    public async update(credential:CredentialEntity):Promise<Credential>{

        if (isNil(credential)) {
            throw new NullException();
        }
        const cripted: string = await encryptPassword(credential.password);

        this.username = credential.username; 
        this.password = cripted;
        this.mail = credential.email;
        this.description = credential.description;

        this.isAdmin = credential.isAdmin;
        this.active = credential.active;

        this.updated = new Date();

        return this;
    }

    public asCredentialEntity(): CredentialEntity {
        return Builder.create<CredentialEntity>()
            .set('id', this.id)
            .set('created', this.created)
            .set('username', this.username)
            .set('password', this.password)
            .set('email', this.mail)
            .set('isAdmin', this.isAdmin)
            .set('active', this.active)
            .set('updated', this.updated)
            .set('description', this.description)
            .build()
    }

    public static mapToCredential(credentialEntiy:CredentialEntity):Credential{
        return Builder.create<Credential>()
            .set('id', credentialEntiy.id)
            .set('created', credentialEntiy.created)
            .set('username', credentialEntiy.username)
            .set('password', credentialEntiy.password)
            .set('mail', credentialEntiy.email)
            .set('isAdmin', credentialEntiy.isAdmin)
            .set('active', credentialEntiy.active)
            .set('updated', credentialEntiy.updated)
            .set('description', credentialEntiy.description)
            .build()
    }
}