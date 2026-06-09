import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Token, TokenService } from "../../auth";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoute, AppRoutePublic, publicRoutes } from "../../../data";
import { catchError, switchMap, tap } from "rxjs";
import { ApiService } from "./api.service";
import { ApiResponseModel } from "../data";
import { RefreshTokenDto } from "../../auth/securite/dto/resfresh-token.dto";

export const HttpInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): any => {
    //route Public

    const pRoutes:string[] = publicRoutes()
    const base = AppRoutePublic.Base
    if (!req.url.startsWith(base) || pRoutes.includes(req.url)) {
        return next(req);
    }

    const tokenService: TokenService = inject(TokenService);
    const apiService: ApiService = inject(ApiService);
    const token: Token = tokenService.token$();
    const router: Router = inject(Router);

    if (!token.isEmpty) {
        
        return next(setTokenInHeader(req, token)).pipe(
           catchError((err: HttpErrorResponse) => handleError(err, req, next, tokenService, router, apiService)) 
        )

    }

    redirectToPublic(router);

}

const setTokenInHeader = (req: HttpRequest<any>, token: Token): HttpRequest<any> => {
    return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.token}`)
    })
}

const redirectToPublic = (router: Router): void => {
    router.navigate([AppRoutePublic.Public]).then();
}

const handleError = async (err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandlerFn, tokenService: TokenService, router: Router, apiService: ApiService): Promise<any> => {

    if (err.status === 401 || err.status === 403) {

        let token: Token = tokenService.token$();

        if (!token.isEmpty) {
            return (await apiService.post(`${AppRoutePublic.Refresh}`, token.refresh)).pipe(

                switchMap((res: ApiResponseModel):any => {
                    const refresh: RefreshTokenDto = res.data;
                    console.log(refresh);
                    
                    token.token = refresh.token;
                    token.refresh = refresh.refreshToken;

                    if (res.result) {
                        return next(setTokenInHeader(req,token)).pipe(
                            catchError((err:HttpErrorResponse)=> handleErrorCommon(err)),
                            tap(() => tokenService.setTokent({...token,isEmpty:false}))
                        )
                        
                    }
                    return redirectToPublic(router);
                })
            ).subscribe();
        }

        return redirectToPublic(router);
    }
    return handleErrorCommon(err)
}

const handleErrorCommon = (err: HttpErrorResponse) => {
    throw (err);
}

