import { Credential } from "../model";

export interface TokenDto {
    credential:Credential | null,
    token:string,
    refresh:string,
}