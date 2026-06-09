import { Routes } from "@angular/router";
import { ContactComponent } from "./page";

export const ContactRoutes:Routes = [
    {
        path:'',
        loadComponent: () =>import('./page').then(c=>c.ContactComponent),
        children:[ 
            {
                path:'',
                redirectTo:'all',
                pathMatch:'full'
            },
            {
                path:'all',
                loadChildren:()=> import('./component').then(r => r.ContactAllRoutes),
            },
            {
                path:'detail',
                loadChildren:()=>import('./component').then(r =>r.ContactDetailRoutes),
            },
            {
                path:'type',
                loadChildren:()=>import('./feature').then(r =>r.TypeContactRoutes),
                //outlet:'typeContact'
            }
        ]
    }
]