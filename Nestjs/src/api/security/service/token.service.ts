import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Token } from "../data/model/Token";
import { NullException, ParamInvalide, TokenGenerationException, TokenNotFoundException, UserNotFoundException } from "home/app.exception";
import { TokenRepository } from "../data/repository/token.repository";
import { ConfigKey, configManager } from "../../common/config";
import { CredentialEntity } from "../data/entity";
import { TokenEntity } from "../data/entity/token.entity";
import { isNil } from "lodash";
import { RefreshTokenPayload } from "../data/Payload/refresh-token.payload";
import { CredentialRepository } from "../data/repository/credential.repository";

@Injectable()
export class TokenService {

    private readonly logger = new Logger(TokenService.name);

    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly credentialRepository: CredentialRepository,
        private jwtService: JwtService
    ) { }

    //------------------------------------------------------------
    //  CREATION DE TOKEN
    //------------------------------------------------------------
    async createTokens(credential: CredentialEntity): Promise<TokenEntity | null> {

        try {

            const token: TokenEntity | null = await this.tokenRepository.findByCredential(credential);
            if ( token !== null) {
                await this.tokenRepository.delete(token.token_id);
            }

            const payload = { sub: credential.id };
            const tokenObject = await this.tokenGenerator(payload);

            const new_element = Token.create(tokenObject.token, tokenObject.refresh, credential);
            return await this.tokenRepository.add(new_element.asTokenEntity());

        } catch (ex) {
            this.logger.error(ex.message);
            throw new TokenGenerationException();
        }
    }

    async refreshToken(refresher: RefreshTokenPayload): Promise<Partial<TokenEntity> | null> {

        if (isNil(refresher)) {
            throw new NullException();
        }

        try {

            const id = this.jwtService.verify(refresher.refresh, {
                secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET)
            });

            const credential: CredentialEntity | null = await this.credentialRepository.findById(id.sub);
            if (isNil(credential)) {
                throw new UserNotFoundException();
            }

            const token: TokenEntity | null = await this.createTokens(credential);

            if (isNil(token)) {
                throw new TokenGenerationException();
            }

            /*const token: TokenEntity | null = await this.tokenRepository.findByRefreshToken(refresher.refresh);

            if (isNil(token)) {
                throw new TokenNotFoundException();
            }
            const payload: { sub: string } = { sub: credential.id };
            const tokenObject = await this.tokenGenerator(payload);

            token.token = tokenObject.token;
            token.refreshToken = tokenObject.refresh;

            const tokenRepo: TokenEntity = await this.tokenRepository.update(token.token_id, token) as TokenEntity;*/

            return token;

        } catch (ex) {

            this.logger.error(ex.message);
            throw new TokenGenerationException();
        }


    }

    async deleteToken(credential: CredentialEntity): Promise<number> {

        if (isNil(credential)) {
            throw new ParamInvalide();
        }

        const token: TokenEntity | null = await this.getToken(credential);
        if (!isNil(token)) {
            await this.tokenRepository.delete(token.token_id);
        }

        return 1;
    }

    //------------------------------------------------------------
    //  CHERCHER LE TOKEN
    //------------------------------------------------------------
    async getToken(credential: CredentialEntity): Promise<TokenEntity | null> {
        if (isNil(credential)) {
            throw new NullException();
        }
        return this.tokenRepository.findByCredential(credential);
    }

    async getRefreshToken(credential: CredentialEntity): Promise<string | null> {
        if (isNil(credential)) {
            throw new NullException();
        }
        const token: TokenEntity = await this.getToken(credential) as TokenEntity;

        return token.refreshToken;
    }
    //------------------------------------------------------------
    //  GENERATEUR DE TOKEN
    //------------------------------------------------------------
    private async tokenGenerator(payload: { sub: string }): Promise<{ token: string, refresh: string }> {

        if (isNil(payload)) {
            throw new NullException();
        }

        const token: string = await this.jwtService.signAsync(
            payload, {
            secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
            expiresIn: configManager.getValueAsNumberOrString(ConfigKey.JWT_TOKEN_EXPIRE_IN) as number,
        });

        const refreshToken: string = await this.jwtService.signAsync(payload, {
            secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
            expiresIn: configManager.getValueAsNumberOrString(ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN) as number
        });

        if (isNil(token) || isNil(refreshToken)) {
            throw new TokenGenerationException();
        }

        return { token: token, refresh: refreshToken };
    }

    public isValide(token: string): boolean {

        let retval: boolean = false;
        
        if (!isNil(token)) {
            const decode = this.jwtService.decode(token);

            const expireAt: number = decode.exp * 1000;
            const now: number = Date.now();

            const resultat = (expireAt - now) / 1000;

            if (resultat > 0) {
                retval = true;
            }
        }

        return retval;
    }
}



