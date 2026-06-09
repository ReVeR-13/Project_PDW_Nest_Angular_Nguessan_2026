import { Routes } from '@angular/router';

export const ContactDetailRoutes:Routes =[
    {
        path:'',
        loadComponent: () => import('./page').then(p=>p.ContactDetail),
    }
]