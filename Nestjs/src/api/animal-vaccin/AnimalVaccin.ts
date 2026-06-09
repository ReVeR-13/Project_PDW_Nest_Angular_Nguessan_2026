import { Animal } from "api/animal/Animal";
import { Vaccin } from "api/vaccin";
import { NullException } from "home/app.exception";

export class AnimalVaccin {

    readonly id: string;
    readonly dateCreation: Date;

    animal: Animal;
    vaccin: Vaccin;
    remaque: string;

    private static num: number = 0;
    private constructor(animal: Animal,vaccin:Vaccin ,details: string) {
        AnimalVaccin.num ++;
        const dte = new Date();
        this.id = AnimalVaccin.num.toString().padStart(2, '0');
        this.dateCreation = dte;
        this.animal = animal;
        this.vaccin = vaccin;
        this.remaque = details;
    }

    public static Creer(animal: Animal,vaccin:Vaccin ,details: string): AnimalVaccin | undefined {
        if (!animal || !vaccin) {
            throw new NullException();
        }

        let retval: AnimalVaccin | undefined = undefined
        retval = new AnimalVaccin(animal, vaccin, details);
        return retval;
    }

    public Modifier(element: AnimalVaccin): AnimalVaccin {
        this.animal = element.animal;
        this.vaccin = element.vaccin;
        this.remaque = element.remaque;
        return this;
    }

}