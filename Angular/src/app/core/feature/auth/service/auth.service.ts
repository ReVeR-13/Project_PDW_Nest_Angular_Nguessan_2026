import { effect, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ApiResponseModel, ApiService } from "../../api";
import { SignInPayload, SignUpPayload } from "../data";
import { Observable, tap } from "rxjs";
import { CredentialDto, CredentialUtils, Token, TokenService, TokenUtils } from "../securite";
import { AppNode, AppRoute, AppRoutePublic } from "../../../data";
import { Credential } from "../securite";
import { SecuriteService } from "../securite";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiResponse$ = signal<ApiResponseModel>({
        code: '',
        data: null,
        result: false,
        paramError: true
    })

    private readonly apiService: ApiService = inject(ApiService);
    private readonly securiteService: SecuriteService = inject(SecuriteService);
    private readonly tokenService: TokenService = inject(TokenService);
    private readonly router: Router = inject(Router);

    public redirectToSecureUrl$: WritableSignal<string> = signal(AppRoute.Dashbord)

    constructor() {
        effect(() => {
            this.handleTokenChange(this.tokenService.token$());
        })
    }

    private handleTokenChange(token: Token): void {

        if (!token.isEmpty) {

            (this.apiService.get(`${AppRoute.Me}${token.credential?.id}`)).pipe(
                tap(
                    (res: ApiResponseModel) => {

                        if (res.result) {
                            const credential: Credential = CredentialUtils.fromDto(res.data as CredentialDto);
                            this.securiteService.credential$.set(credential);

                            if (!window.location.pathname.startsWith(`/${AppRoute.Dashbord}`)) {
                                this.router.navigate([this.redirectToSecureUrl$()]).then();
                            }
                        }
                    }
                )
            ).subscribe();
        }
    }

    async signIn(payload: SignInPayload): Promise<Observable<ApiResponseModel>> {
        const data = (await this.apiService.post(AppRoutePublic.Sign_in, payload)).pipe(
            tap((response: ApiResponseModel) => {
                if (response.result) {
                    this.setCredential(response);
                }
            }
            ))
        return data
    }

    async signUp(payload: SignUpPayload): Promise<Observable<ApiResponseModel>> {
        const data = (await this.apiService.post(AppRoutePublic.Sign_up, payload)).pipe(
            tap((res: ApiResponseModel) => {
                if (res.result) {
                    this.setCredential(res);
                }
            })
        );
        return data
    }

    public logOut(): void {
        this.securiteService.logOut();
        this.redirectToSecureUrl$.set(AppRoute.Dashbord)
    }

    setApiResponse(data: ApiResponseModel): void {
        this.apiResponse$.set(data);
    }

    private setCredential(response: ApiResponseModel): void {
        const credential: Credential = CredentialUtils.fromDto(response.data as CredentialDto);
        const token: Token = TokenUtils.fromCredentialDTO(response.data as CredentialDto)
        this.securiteService.setCredential(credential, token);
    }

}