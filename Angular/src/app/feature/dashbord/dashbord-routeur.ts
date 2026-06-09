import { Routes } from "@angular/router";

export const DashbordRoutes:Routes = [
    {
        path:'',
        loadComponent:
         () => import('./routeur')
         .then(r =>r.DashbordRouteur),
        children:[
            {
                path:'',
                loadComponent:
                ()=> import('./page')
                .then(p=>p.DashbordHomePage)
            },
            
            {
                path:'contact',
                loadChildren:
                ()=> import('./feature')
                .then(r=>r.ContactRoutes)
            },
        ]
    }
]