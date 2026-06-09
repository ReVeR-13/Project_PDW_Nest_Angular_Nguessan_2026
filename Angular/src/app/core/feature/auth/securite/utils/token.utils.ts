import { CredentialDto, TokenDto } from "../dto"
import { Token } from "../model"
import { CredentialUtils } from "./credential.utils"

export class TokenUtils {

    public static tokenFromDto(dto: TokenDto): Token {
        return {
            credential: dto.credential,
            token: dto.token,
            refresh: dto.refresh,
            isEmpty: false
        }
    }

    public static getEmpty(): Token {
        return {
            credential: null,
            token: '',
            refresh: '',
            isEmpty: true
        }
    }

    public static fromCredentialDTO(dto:CredentialDto):Token {
        return {
            token: dto.token,
            credential: CredentialUtils.fromDto(dto),
            refresh: dto.refreshToken,
            isEmpty: false
        }
    }
}