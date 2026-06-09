import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { ApiResponseModel } from "../data/model";
import { AppRoute, AppRoutePublic } from "../../../data";


@Injectable({
    providedIn:'root'
})
export class ApiService{

    private readonly baseUrl:string =AppRoutePublic.Base;
    private readonly http:HttpClient = inject(HttpClient)   

    public get(uri:string):Observable<ApiResponseModel>{
         console.log(`${this.baseUrl}${uri}`);
        return this.recuperateur(this.http.get(`${this.baseUrl}${uri}`)) ;
    }

    public async post(uri:string,payload:any):Promise<Observable<ApiResponseModel>>{
        console.log(`${this.baseUrl}${uri}`);
        console.log(payload);
        return this.recuperateur(this.http.post(`${this.baseUrl}${uri}`, payload)) ;
    }

    public put(uri:string,payload:any):Observable<ApiResponseModel>{
        return this.recuperateur(this.http.put(`${this.baseUrl}${uri}`,payload)) ;
    }

    public patch(uri:string,payload:any):Observable<ApiResponseModel>{
        return this.recuperateur(this.http.patch(`${this.baseUrl}${uri}`, payload)) ;
    }

    public delete(uri:string):Observable<ApiResponseModel>{
        return this.recuperateur(this.http.delete(`${this.baseUrl}${uri}`)) ;
    }

    private recuperateur(obs:Observable<any>):Observable<ApiResponseModel>{
        return obs.pipe(
            map((res:Object)=>{
                console.log(res);
                
                return this.successHandler(res);
            }),
            catchError((err:HttpErrorResponse)=>of(this.echecHandler(err)))
                
        )
    }

    private successHandler(res:Object):ApiResponseModel{
        return { ...res as ApiResponseModel,
            paramError:false}
    }

    private echecHandler(httpError:HttpErrorResponse):ApiResponseModel{
        return {
            code:httpError.error ,
            data:null,
            result:false,
            paramError:(httpError.status === 499)}
    }
}