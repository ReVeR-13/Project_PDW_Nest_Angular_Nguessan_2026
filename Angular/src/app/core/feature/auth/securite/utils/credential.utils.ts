
import { CredentialDto } from "../dto";
import { Credential } from "../model";

export class CredentialUtils {

    static fromDto(data: CredentialDto): Credential {
        return {
            isEmpty: false,
            id: data.id,
            created: data.created,
            description: data.description,
            email: data.email,
            updated: data.updated,
            username: data.username,
        }
    }

    static getEmpty(): Credential {
        return {
            isEmpty: true,
            id: '',
            created: new Date(),
            description: '',
            email: '',
            updated: new Date(),
            username: '',
        }
    }
}