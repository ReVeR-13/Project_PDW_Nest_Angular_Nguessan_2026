import { Injectable } from '@nestjs/common';
import { TypeAnimal } from './TypeAnimal';
import { DataG } from '../../../../lesBases/DB_stock';
import { TypeAnimalRepository } from './repository/type-animal.repository';

@Injectable()
export class TypeAnimalService {

    constructor(private readonly TypeRepo: TypeAnimalRepository){}

    private static t_types: TypeAnimal[] = DataG.t_typesAnimal;

    public async FindAll(): Promise<TypeAnimal[]> {
        let rep  = await this.TypeRepo.findAll();
        for( let a in rep){
            console.log(a,rep[a]);
        }
        return TypeAnimalService.t_types;
    }

    public FindUn(id: string): TypeAnimal | string {
        let retval: TypeAnimal | string = `Cet type [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in TypeAnimalService.t_types) {

            const element: TypeAnimal = TypeAnimalService.t_types[n] as TypeAnimal
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(type: TypeAnimal): TypeAnimal | string {
        const newtps: TypeAnimal | undefined = TypeAnimal.Create(type.libele, type.details);

        if (newtps !== undefined) {
            TypeAnimalService.t_types.push(newtps)
            console.log(TypeAnimalService.t_types);

        }

        return newtps ? newtps : 'no contact made';
    }

    public Modifier(id: string, type: TypeAnimal): TypeAnimal {
        const idx: number = TypeAnimalService.t_types.findIndex((tps) => tps.id === id.padStart(2, '0'));
        TypeAnimalService.t_types[idx].Modifier(type.libele, type.details);
        return TypeAnimalService.t_types[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = TypeAnimalService.t_types.findIndex((type) => type.id === id.padStart(2, '0'));
        if (TypeAnimalService.t_types[idx]) {
            TypeAnimalService.t_types.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }
}
