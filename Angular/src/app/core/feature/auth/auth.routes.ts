import { Routes } from "@angular/router";

export const authRoutes:Routes = [
    {
        path:'',
        loadComponent: () => import('./routeur').then(r =>r.AuthRouteur),
        children:[
            {
                path:'',
                loadComponent:()=> import('./page').then(p=>p.SignInPage),
                outlet:'signin'
            },
            {
                path:'**',
                loadComponent:()=> import('./page').then(p=>p.SignInPage),
                outlet:'signin'
            },
            
            {
                path:'',
                loadComponent:()=> import('./page').then(p=>p.SignUpPage),
                outlet:'signup'
            }
        ]
    }
]