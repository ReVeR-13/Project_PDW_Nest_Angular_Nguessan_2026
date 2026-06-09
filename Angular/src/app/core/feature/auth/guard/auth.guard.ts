import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SecuriteService } from "../securite";
import { AppRoute } from "../../../data";

export const AuthdGuard = ( redirectRoute:string = AppRoute.Dashbord):CanActivateFn => {
    return () => {

        const securiteService:SecuriteService = inject(SecuriteService);
        const canAccess:boolean = !securiteService.credential$().isEmpty;
        const router:Router = inject(Router);
        return !canAccess || router.createUrlTree([redirectRoute]);
        
    }
}