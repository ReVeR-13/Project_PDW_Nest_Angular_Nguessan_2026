import { Routes } from "@angular/router";

export const TypeContactRoutes:Routes= [
    {
        path:'',
        loadComponent:()=>import('./page').then(c=>c.TypeContactCompnent),
        children:[
            {
                path:'',
                loadComponent: () => import('./component').then(p => p.TypeContactAll),
                outlet:'typeContactAll'
            },
            {
                path:'detail',
                loadComponent: () => import('./component').then(p => p.TypeContactDetail),
                outlet:'typeContactDetail'
            },
            {
                path:'add',
                loadComponent: () => import('./component').then(p => p.TypeContactAdd),
                outlet:'typeContactAdd'
            },
            {
                path:'update',
                loadComponent: () => import('./component').then(p => p.TypeContactUpdate),
                outlet:'typeContactUpdate'
            },
            {
                path:'delete',
                loadComponent: () => import('./component').then(p => p.TypeContactDelete),
                outlet:'typeContactDelete'
            },
            {
                path:'**',
                loadComponent: () => import('./component').then(p => p.TypeContactAll),
                outlet:'typeContactAll'
            },
        ]

    }
]