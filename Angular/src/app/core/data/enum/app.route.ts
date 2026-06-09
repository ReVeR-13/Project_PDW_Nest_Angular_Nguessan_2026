import { AppNode } from "./app.node";

export enum AppRoutePublic{
    Base = 'http://localhost:4031/api/',
    Account = 'account',
    Sign_in = `${AppNode.Account}/signin`,
    Sign_up= `${AppNode.Account}/signup`,
    Refresh = `${AppNode.Account}/refresh`,
    Public = Sign_in,
}

export enum AppRoute{
    Dashbord=`${AppNode.Dashbord}`,
    Contact =`contact`,
    Contact_Detail = `${Contact}/detail`,
    Me= `${AppRoutePublic.Account}/detail/`,
    
}

export const publicRoutes = ():string[] => {
    return Object.values(AppRoutePublic).map((path:AppRoutePublic)=> {
        const base:string = AppRoutePublic.Base;
        const cleanPath:string = path.replace(/^\/+/,'');
        return `${base}${cleanPath}`;
    })
}