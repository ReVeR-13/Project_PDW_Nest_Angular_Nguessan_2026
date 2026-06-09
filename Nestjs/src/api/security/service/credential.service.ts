import { Injectable, Logger } from '@nestjs/common';
import {
    CreationFailException,
    DeleteFailException,
    ExistException,
    NotFoundException,
    NullException,
    ParamInvalide,
    TokenGenerationException,
    TokenNotFoundException,
    UpdateFailException,
    UserNotFoundException
} from 'home';
import { isNil, now } from 'lodash';
import { SignInPayload } from 'api/security/data/Payload/sign-in.payload';
import { CredentialRepository } from 'api/security/data/repository/credential.repository';
import { CredentialEntity } from 'api/security/data/entity/credential.entity'
import { comparePassword, encryptPassword } from 'api/security/utils/password.decoder';
import { Credential } from '../data/model/Credential';
import { SignUpDto } from '../data/dto/sign-up.dto';
import { TokenEntity } from '../data/entity/token.entity';
import { TokenService } from './token.service';
import { CredentialDto } from '../data/dto/credential.dto';
import { RefreshTokenPayload } from '../data/Payload/refresh-token.payload';
import { UpdateDto } from '../data/dto/update.dto';
import { RefreshTokenDto } from '../data/dto/refresh-token.dto';
import { color } from '../../../../Helper/help_color';

@Injectable()
export class CredentialService {

    private readonly logger = new Logger(CredentialService.name);
    private DB_Credential: Promise<CredentialEntity[]>;

    constructor(
        private readonly repo: CredentialRepository,
        private readonly tokenService: TokenService,

    ) { this.DB_Credential = this.repo.findAll() }


    public async signUp(payload: SignUpDto): Promise<Partial<CredentialDto> | null> {


        //------------------------------------------------------------
        //  VERIFICATION DES DONNÈES
        //------------------------------------------------------------

        if (isNil(payload)) {
            throw new ParamInvalide();
        }

        const mail: CredentialEntity | null = await this.repo.findByEmail(payload.email);
        const username: CredentialEntity | null = await this.repo.findByUsername(payload.username);

        if (!isNil(mail) || !isNil(username)) {
            throw new ExistException();
        }

        //------------------------------------------------------------
        //  CREATION DU CREDENTIAL
        //------------------------------------------------------------

        const new_element: Credential = await Credential.create
            (
                payload.username,
                payload.password,
                payload.email,
                payload.description
            );

        if (isNil(new_element)) {
            throw new CreationFailException();
        }

        const credential: CredentialEntity = await this.repo.add(new_element.asCredentialEntity()) as CredentialEntity;

        if (isNil(credential)) {
            throw new CreationFailException();
        }

        const token = await this.tokenService.createTokens(new_element.asCredentialEntity()) as TokenEntity;

        if (isNil(token)) {
            throw new CreationFailException();
        }

        //------------------------------------------------------------
        //  RETOUR DES DONNÈES
        //------------------------------------------------------------
        this.logger.log(payload)
        return {
            id: credential.id,
            created: credential.created,
            updated: credential.updated,

            username: credential.username,
            email: credential.email,
            description: credential.description,

            token: token.token,
            refreshToken: token.refreshToken,
        };

    }

    public async signIn(payload: SignInPayload, isAdmin: boolean): Promise<Partial<CredentialDto> | null> {

        //------------------------------------------------------------
        //  VERIFICATION DES DONNÈES
        //------------------------------------------------------------

        if (isNil(payload)) {
            throw new NullException();
        }

        let user: CredentialEntity | null = (await this.DB_Credential).find(a => a.email === payload.email) as CredentialEntity;
        if (isNil(user)) {
            user = await this.repo.findByEmail(payload.email);
            (await this.DB_Credential).push(user as CredentialEntity)
        }

        if (isNil(user)) {
            throw new UserNotFoundException();
        }

        if (! await comparePassword(payload.password, user.password)) {
            throw new ParamInvalide();
        }

        //------------------------------------------------------------
        //  CONNEXION DE L'UTILISATEUR 
        //------------------------------------------------------------

        // EN ADMINISTRATEUR --

        //------------------------------------------------------------
        //  CREATION DU NOUVEAU TOKEN
        //------------------------------------------------------------

        const token: TokenEntity | null = await this.tokenService.createTokens(user);
        if (isNil(token)) {
            throw new TokenGenerationException();
        }


        //------------------------------------------------------------
        //  MISE A JOUR DE CONNECTION
        //------------------------------------------------------------



        //------------------------------------------------------------
        //  RETOUR DES DETAILS 
        //------------------------------------------------------------
        this.logger.log(`${color.gris('Email:')} '${color.bleu(payload.email)}' -- ${color.gris('Password:')}  '${color.bleu(payload.password)}'`);
        return {
            id: user.id,
            created: user.created,
            updated: user.updated,

            username: user.username,
            email: user.email,
            description: user.description,

            token: token.token,
            refreshToken: token.refreshToken,
        };

    }

    public async details(id: string): Promise<Partial<CredentialDto> | null> {

        const credential: CredentialEntity | null = await this.repo.findById(id);
        if (isNil(credential)) {
            throw new NotFoundException();
        }

        let token: TokenEntity | null = await this.tokenService.getToken(credential as CredentialEntity);

        if (isNil(token)) {
            throw new TokenGenerationException()
        }

        return {
            id: credential.id,
            created: credential.created,
            updated: credential.updated,

            username: credential.username,
            email: credential.email,
            description: credential.description,

            token: token.token,
            refreshToken: token.refreshToken,
        }
    }

    public async update(id: string, data: UpdateDto): Promise<Partial<CredentialDto> | null> {

        try {

            if (isNil(id) || isNil(data)) {
                throw new NullException();
            }

            let credentialEntiy: CredentialEntity | null = await this.repo.findById(id);

            this.logger.log(data);

            if (isNil(credentialEntiy) || isNil(data)) {
                throw new NotFoundException();
            }

            data.password = data.password ? await encryptPassword(data.password) : credentialEntiy.password;

            await this.repo.update(id, data)

            return await this.details(id);
        } catch (ex) {
            this.logger.error(ex.message);
            throw new UpdateFailException();
        }

    }

    public async delete(id: string): Promise<number> {
        try {

            if (isNil(id)) {
                throw new ParamInvalide();
            }

            const credential: CredentialEntity | null = await this.repo.findById(id);
            if (isNil(credential)) {
                throw new UserNotFoundException();
            }

            const token: TokenEntity | null = await this.tokenService.getToken(credential);
            if (!isNil(token)) {
                this.tokenService.deleteToken(credential);
            }

            return await this.repo.delete(credential.id);

        } catch (ex) {
            this.logger.error(ex.message);
            throw new DeleteFailException();
        }

    }

    public async refreshToken(payload: RefreshTokenDto): Promise<Partial<CredentialDto> | null> {
        if (isNil(payload)) {
            throw new ParamInvalide();
        }

        const valeur: RefreshTokenPayload = {
            refresh: payload.valeur
        }
        const token: Partial<TokenEntity> | null = await this.tokenService.refreshToken(valeur);

        if (isNil(token)) {
            throw new TokenGenerationException();
        }
        return await this.details(token.credential?.id as string)

    }
}
