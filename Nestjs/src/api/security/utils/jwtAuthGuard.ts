import { ExecutionContext, Injectable, Logger, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../../common/config/metadata/public.decorateur";
import { BadGuardAccessException, NotExistException, TokenExpiredException, TokenNotFoundException, UserNotFoundException } from "home/app.exception";
import { JwtService } from "@nestjs/jwt";
import { ConfigKey, configManager, CredentialService } from "home";
import { Observable } from "rxjs";
import { isNil } from "lodash";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private readonly logger = new Logger(JwtAuthGuard.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly credentialSrv: CredentialService,
        private readonly reflector: Reflector) {

    }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {

            const isPublic = this.reflector.getAllAndOverride<boolean>(
                IS_PUBLIC_KEY,
                [
                    context.getHandler(),
                    context.getClass(),
                ],
            )

            return isPublic ? true : this.validateToken(context.switchToHttp().getRequest());

        } catch (ex) {
            this.logger.error(ex.message);
            throw new BadGuardAccessException();
        }

    }

    private async validateToken(req: any): Promise<boolean> {

        const authHeader = req.headers['authorization'];
        if (isNil(authHeader)) {
            throw new TokenNotFoundException();
        }

        if (!authHeader.startsWith('Bearer')) {
            throw new TokenNotFoundException();
        }

        const token = authHeader.replace('Bearer', '').trim();

        if (isNil(token)) {
            throw new TokenNotFoundException();
        }
        
        try {

            const payload = this.jwtService.verify(token, {
                secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET)
            });

            const user = await this.credentialSrv.details(payload.sub);
            console.log(token);

            if (isNil(user)) {
                throw new UserNotFoundException()
            }

            if (isNil(user.token)) {
                throw new TokenNotFoundException();
            }
            req.user = user;
            return true;

        } catch (ex) {

            this.logger.error(ex.message);
            if (ex.name == 'TokenExpiredError') {
                throw new TokenExpiredException();
            }
            throw new BadGuardAccessException();

        }
    }
}