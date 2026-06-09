import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Credential, Token } from "../model";
import { CredentialUtils } from "../utils";
import { Router } from "@angular/router";
import { TokenService } from "./token.service";
import { AppNode, AppRoute, AppRoutePublic } from "../../../../data";

@Injectable({
    providedIn: 'root'
})
export class SecuriteService {

    public credential$: WritableSignal<Credential> = signal(CredentialUtils.getEmpty());

    private readonly router: Router = inject(Router);
    private readonly tokenService: TokenService = inject(TokenService);

    constructor() { }

    public setCredential(credential: Credential, token: Token): void {
        this.credential$.set(credential);
        this.tokenService.setTokent(token);
    }

    public logOut(): void {
        this.credential$.set(CredentialUtils.getEmpty());
        this.tokenService.deconnection();
        this.router.navigate([AppNode.Auth]).then();
    }
}