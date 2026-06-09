import { Type } from "../../../../lesBases";

export class TypeContact extends Type {
    private static _num:number = 0;
    readonly id : string;

    private constructor(libele:string,details:string){
        super(libele,details);
        TypeContact._num++;
        this.id = TypeContact._num.toString().padStart(2,"0");
    }

    public static Create (libele: string, detail: string):TypeContact{
        let retval :TypeContact = new TypeContact(libele,detail);
        return retval;
    }
}