import { isNil } from "lodash";
import { TokenEntity } from "../entity/token.entity";
import { CredentialEntity } from "../entity";
import { NullException } from "home";
import { Builder } from "api/security/utils/entity.builder";
import { idBuilderWithUlid } from "api/security/utils/id.builder";

export class Token{
    id:string;
    dateCreation: Date;

    token:string;
    refreshToken: string;

    credential:CredentialEntity
    private constructor(token:string, refresh: string, credential:CredentialEntity){

        this.id = idBuilderWithUlid();
        const dte = new Date();
        this.dateCreation = dte

        this.token = token;
        this.refreshToken = refresh;

        this.credential = credential

    }

    public static create(token:string, refresh: string, credential:CredentialEntity):Token{
        if (isNil(token) || isNil(refresh) || isNil(credential) ) {
            throw new NullException();
        }
        return new Token(token,refresh,credential);
    }

    public asTokenEntity():TokenEntity{
        return Builder.create<TokenEntity>()
        .set('token_id',this.id)
        .set('dateCreation',this.dateCreation)
        .set('token',this.token)
        .set('refreshToken',this.refreshToken)
        .set('credential',this.credential)
        .build()
    }
    
}
