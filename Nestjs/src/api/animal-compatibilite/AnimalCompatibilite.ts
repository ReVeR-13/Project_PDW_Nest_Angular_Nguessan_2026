import { Animal } from "api/animal/Animal";
import { Compatibilite } from "api/compatibilite";
import { NullException } from "home/app.exception";

export class AnimalCompatibilite {

    readonly id: string;
    readonly dateCreation: Date;

    animal: Animal;
    Compatibilite: Compatibilite;
    remaque: string;
    valeur: boolean;

    private static num: number = 0;
    private constructor(animal: Animal,comp:Compatibilite ,details: string,valeur:boolean) {
        AnimalCompatibilite.num ++;
        const dte = new Date();
        this.id = AnimalCompatibilite.num.toString().padStart(2, '0');
        this.dateCreation = dte;
        this.animal = animal;
        this.Compatibilite = comp;
        this.remaque = details;
        this.valeur = valeur;
    }

    public static Creer(animal: Animal,comp:Compatibilite ,details: string,valeur:boolean): AnimalCompatibilite | undefined {
        if (!animal || !comp) {
            throw new NullException();
        }

        let retval: AnimalCompatibilite | undefined = undefined
        retval = new AnimalCompatibilite(animal, comp, details,valeur);
        return retval;
    }

    public Modifier(element: AnimalCompatibilite): AnimalCompatibilite {
        this.animal = element.animal;
        this.Compatibilite = element.Compatibilite;
        this.remaque = element.remaque;
        this.valeur = element.valeur;
        return this;
    }

    public getAnimal(): Animal{
        return this.animal;
    }

    public getCompatibilite (): Compatibilite {
        return this.Compatibilite;
    }

    public getRemarque (): string {
        return this.remaque;
    }

    public getValeur (): boolean {
        return this.valeur;
    }
}