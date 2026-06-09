import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { SecuriteService } from "../../../core";
import { AuthService } from "../../../core/feature/auth/service";

export const DashbordGuard = (redirectRoute:string = '/auth'):CanActivateFn => {
    return (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) => {
        
        const securiteService:SecuriteService = inject(SecuriteService);
        const authService:AuthService = inject(AuthService);

        authService.redirectToSecureUrl$.set(state.url);

        let etat:boolean = true
        if(securiteService.credential$().isEmpty){
            etat = false
        }

        const canAccess:boolean = etat;
        const router:Router = inject(Router);
        return canAccess || router.createUrlTree([redirectRoute])
    }
}