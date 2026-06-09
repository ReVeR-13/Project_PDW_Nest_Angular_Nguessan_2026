import { Injectable } from '@nestjs/common';
import { Animal } from './Animal';
import { Vaccin } from 'api/vaccin';
import { Compatibilite } from 'home';
import { DataG } from '../../../lesBases/DB_stock';
import { AnimalRepository } from './repositories/animal.repository';
import { AnimalEntity } from './entities/animal.entity';

@Injectable()
export class AnimalService {

    constructor(private readonly animalRepo: AnimalRepository){}
    
    private static t_animal: Animal[] = DataG.t_animal;

    public async FindAll(): Promise<Animal[]> {
        let rep  = await this.animalRepo.findAll();
        for( let a in rep){
            console.log(a,rep[a]);
        }
        return AnimalService.t_animal;
    }
    public FindUn(id: string): Animal | string {
        let retval: Animal | string = `Cet animal [${id.toUpperCase().trim()}] n'existe pas`;
        for (const n in AnimalService.t_animal) {

            const element: Animal = AnimalService.t_animal[n] as Animal
            if (id.toUpperCase().trim() === element.id.toUpperCase()) {
                retval = element
            }

        }
        return retval;
    }
    public Creer(animal: Animal): Animal | string {
        const newanimal: Animal | undefined = Animal.Creer(animal);

        if (newanimal !== undefined) {
            AnimalService.t_animal.push(newanimal);
        }

        return newanimal ? newanimal : 'no animal made';
    }
    public Modifier(id: string, animal: Animal): Animal {
        const idx: number = AnimalService.t_animal.findIndex((a) => a.id === id);
        AnimalService.t_animal[idx].Modifier(animal);
        return AnimalService.t_animal[idx];
    }
    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = AnimalService.t_animal.findIndex((a) => a.id === id.toUpperCase().trim());
        if (AnimalService.t_animal[idx]) {
            AnimalService.t_animal.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }


    public AllVaccin(id: string): Vaccin[] {
        let retval : Vaccin[]=[];
        let animal : Animal;
        if (this.FindUn(id) != `Cet animal [${id.toUpperCase().trim()}] n'existe pas`) {
            animal =this.FindUn(id) as Animal;
            retval = animal.getVaccins();
        }
        
        return retval;
    }
    public FindUnVaccin(id: string, vaccin: Vaccin): Vaccin | undefined {
        const animal: Animal = this.FindUn(id) as Animal;
        let retval: Vaccin | undefined = undefined
        if (animal) {
            retval = animal.findVaccin(vaccin) as Vaccin ;
        }
        return retval;
    }
    public AddVaccin(vaccin: Vaccin, id: string): string {
        const animal: Animal = this.FindUn(id) as Animal;
        if (animal) {
            animal.addVaccin(vaccin)
        }

        return 'no animal made';
    }
    public SupprimerVaccin(id: string, vaccin: Vaccin): string {
        let retval = 'Suppression annulée';
        const animal: Animal = this.FindUn(id) as Animal;
        if (animal) {
            animal.removeVaccin(vaccin);
            retval = `Suppression effectué`;
        }
        return retval;
    }

    public AllCompatibilite(id_animal: string): Compatibilite[] {
        let retval : Compatibilite[]=[];
        let animal :Animal;
        if (this.FindUn(id_animal) != `Cet animal [${id_animal.toUpperCase().trim()}] n'existe pas`) {
            animal =this.FindUn(id_animal) as Animal;
            retval = animal.getCompatibilites();
        }
        
        return retval;
    }
    public FindUnCompatibilite(id: string, comp: Compatibilite): Compatibilite | null {
        const animal: Animal = this.FindUn(id) as Animal;
        let retval: Compatibilite | null = null;
        if (animal) {
            retval = animal.findCompatibilite(comp);
        }
        return retval;
    }
    public AddCompatibilite(comp: Compatibilite, id: string): string {
        const animal: Animal = this.FindUn(id) as Animal;
        if (animal) {
            animal.addCompatibilite(comp);
        }

        return 'no animal made';
    }
    public SupprimerCompatibilite(id: string, comp: Compatibilite): string {
        let retval = 'Suppression annulée';
        const animal: Animal = this.FindUn(id) as Animal;
        if (animal) {
            animal.removeVaccin(comp);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
