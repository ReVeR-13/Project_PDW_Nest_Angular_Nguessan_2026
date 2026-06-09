import { RefreshTokenDto } from "./resfresh-token.dto";

export interface CredentialDto extends RefreshTokenDto{
    id: string,
    created: Date,
    description: string,
    email: string,
    updated: Date,
    username: string,
}