import { Motif } from "../../../../lesBases";

export class MotifEntree extends Motif {
    private static _num: number = 0;
    readonly id: string;

    private constructor(libele: string, details: string) {
        super(libele, details);
        MotifEntree._num++;
        this.id = MotifEntree._num.toString().padStart(2, "0");
    }

    public static Create(libele: string, detail: string): MotifEntree {
        let retval: MotifEntree = new MotifEntree(libele, detail);
        return retval;
    }
}