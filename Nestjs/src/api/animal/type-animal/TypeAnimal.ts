import { Type } from "../../../../lesBases";

export class TypeAnimal extends Type {
    private static _num:number = 0;
    readonly id : string;

    private constructor(libele:string,details:string){
        super(libele,details);
        TypeAnimal._num++;
        this.id = TypeAnimal._num.toString().padStart(2,"0");
    }

    public static Create (libele: string, detail: string):TypeAnimal{
        let retval :TypeAnimal = new TypeAnimal(libele,detail);
        return retval;
    }
}