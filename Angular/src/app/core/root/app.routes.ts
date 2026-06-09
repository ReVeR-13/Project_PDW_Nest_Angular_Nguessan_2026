import { Routes } from '@angular/router';
import { DashbordGuard } from '../../feature';
import { AuthdGuard } from '../feature';
import { AppNode, AppRoute } from '../data';

export const routes: Routes = [

    {
        path:'',
        redirectTo:AppRoute.Dashbord,
        pathMatch:'full'
    },

    {
        path:'auth', 
        canActivate:[AuthdGuard(AppRoute.Dashbord)],
        loadChildren: () => 
            import('../../core')
            .then(r => r.authRoutes)
    },

    {
        path:'dashbord', 
        canActivate:[DashbordGuard(AppNode.Auth)],
        loadChildren: () => 
             import('../../feature')
            .then(r => r.DashbordRoutes)
    }
];
