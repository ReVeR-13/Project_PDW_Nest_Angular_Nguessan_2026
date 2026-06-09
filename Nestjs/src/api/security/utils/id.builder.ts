import { ulid } from "ulid";

export const idBuilderWithUlid = ():string => {
    return ulid();
}

export const idBuilder = (prefixe:string,x:number):string => {
    const dte:Date = new Date();
    const yyyy : number = dte.getFullYear();
    const mm:string = String(dte.getMonth() +1).padStart(2,'0');
    const dd:string = String(dte.getDate()).padStart(2,'0');

    const id: string = `${prefixe}${yyyy}${mm}${dd}-${String(x).padStart(5,'0')}`;
    return id;
}