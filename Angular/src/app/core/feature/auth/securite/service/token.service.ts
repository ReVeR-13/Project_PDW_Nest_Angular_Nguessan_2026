import { effect, Injectable, signal, WritableSignal } from "@angular/core";
import { Token } from "../model";
import { TokenUtils } from "../utils";

@Injectable({
    providedIn:'root'
})
export class TokenService{

    private readonly key:string = 'tokenKey';
    token$:WritableSignal<Token> = signal(this.getToken());

    constructor(){
        effect(()=> this.handleTokenChange(this.token$()))
    }

    public deconnection():void{
        this.setTokent(TokenUtils.getEmpty());
    }

    public setTokent(token:Token):void{
        this.token$.set(token);
        this.handleTokenChange(token);
    }

    private handleTokenChange(token:Token):void{
        if (token.isEmpty) {
            localStorage.removeItem(this.key);
        }else{
            localStorage.setItem(this.key, JSON.stringify(token))
        }
        
    }

    private getToken():Token{
        const str:string | null = localStorage.getItem(this.key);
        return str !== null ? JSON.parse(str) : TokenUtils.getEmpty() ;
    }

    
}