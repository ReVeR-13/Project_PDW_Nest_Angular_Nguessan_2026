import { Vaccin } from "api/vaccin";
import { TypeAnimal } from "./type-animal";
import { Compatibilite } from "home";
import { Abri } from "../abri/Abri";

export enum StatutAnimal {

    EXAMINATION  = 'EXAMINATION',
    REFUGE       = 'REFUGE',
    ACCUEIL      = 'ACCUEIL',
    ADOPTION     = 'ADOPTION',
    PROPRIETAIRE = 'PROPRIETAIRE',
    DECEDE       = 'DECEDE'
}
export enum Sexe{
    M='M',
    F='F'
}

export class Animal {

    readonly id: string;
    readonly date: Date

    nom: string;
    date_naiss: Date;
    sexe: Sexe;
    couleur: string;
    type: TypeAnimal;
    steril: boolean;
    date_steril?: Date;
    statut: StatutAnimal;

    date_deces?: Date;
    descrip: string;
    particularite: string;

    private t_vaccin: Vaccin[];
    private t_compatible: Compatibilite[];

    abri: Abri;

    private static num: number = 0;

    private constructor(nom: string, date_naiss: Date, sexe: Sexe, couleur: string, type: TypeAnimal, steril: boolean
        , statut: StatutAnimal, descrip: string, particularite: string, date_steril?: Date) {

        const dte: Date = new Date();
        Animal.num++;
        this.id = `${dte.toISOString().slice(0, 10).replace(/-/g, '')}${Animal.num.toString().padStart(5, '0')}`;
        this.date = dte;

        this.nom = nom;
        this.date_naiss = date_naiss;
        this.sexe = sexe;
        this.couleur = couleur;
        this.type = type;
        this.steril = steril;
        this.date_steril = date_steril;
        this.statut = statut;
        this.descrip = descrip;
        this.particularite = particularite;

        this.t_vaccin = [];
        this.t_compatible = [];        
    }

    public addVaccin(vaccin: Vaccin) {
        if (!this.t_vaccin.find(x=> x.id === vaccin.id)) {
            this.t_vaccin.push(vaccin);
        }
    }
    public removeVaccin(vaccin: Vaccin) {
        this.t_vaccin = this.t_vaccin.filter(x=> x.id !== vaccin.id);
    }
    public getVaccins(): Vaccin[] {
        return [...this.t_vaccin];
    }
    public findVaccin(vaccin: Vaccin): Vaccin | null {
        return this.t_vaccin.find(x => x.id === vaccin.id) || null;
    }

    public addCompatibilite(comp: Compatibilite) {
        if (!this.t_compatible.find(x=> x.id === comp.id)) {
            this.t_compatible.push(comp);
        }
        
    }
    public removeCompatibilite(comp: Compatibilite) {
        this.t_compatible = this.t_compatible.filter(x => x.id !== comp.id);
    }
    public getCompatibilites(): Vaccin[] {
        return [...this.t_compatible];
    }
    public findCompatibilite(cpm: Compatibilite): Compatibilite | null {
        return this.t_compatible.find(x => x.id === cpm.id) || null;
    }

    public Modifier(animal: Animal): Animal {
        this.nom = animal.nom;
        this.date_naiss = animal.date_naiss;
        this.sexe = animal.sexe;
        this.couleur = animal.couleur;
        this.type = animal.type;
        this.steril = animal.steril;
        this.date_steril = animal.date_steril;
        this.statut = animal.statut;
        this.descrip = animal.descrip;
        this.particularite = animal.particularite;
        this.date_deces = animal.date_deces;

        return this;
    }

    public static Creer(animal: Animal): Animal {

        let retval: Animal = new Animal(animal.nom, animal.date_naiss, animal.sexe, animal.couleur,
            animal.type, animal.steril, animal.statut, animal.descrip, animal.particularite, animal.date_steril);
        return retval;
    }

}