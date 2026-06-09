import { Routes } from "@angular/router";

export const ContactAllRoutes:Routes =[
    {
        path:'',
        loadComponent: () => import('./page').then(p=>p.ContactAll),
    }
]