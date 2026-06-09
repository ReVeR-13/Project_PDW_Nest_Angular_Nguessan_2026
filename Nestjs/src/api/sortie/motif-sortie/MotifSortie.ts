import { Motif } from "../../../../lesBases";

export class MotifSortie extends Motif {
    private static _num: number = 0;
    readonly id: string;

    private constructor(libele: string, details: string) {
        super(libele, details);
        MotifSortie._num++;
        this.id = MotifSortie._num.toString().padStart(2, "0");
    }

    public static Create(libele: string, detail: string): MotifSortie {
        let retval: MotifSortie = new MotifSortie(libele, detail);
        return retval;
    }
}