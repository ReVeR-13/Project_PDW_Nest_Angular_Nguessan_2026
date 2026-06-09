import { Injectable } from '@nestjs/common';
import { TypeContact } from './TypeContacte'
import { DataG } from '../../../../lesBases/DB_stock';

@Injectable()
export class TypeContactService {

    private static t_types: TypeContact[] = DataG.t_typesContact;

    public FindAll(): TypeContact[] {
        return TypeContactService.t_types;
    }

    public FindUn(id: string): TypeContact | string {
        let retval: TypeContact | string = `Ce type [${id.padStart(2, '0')}] n'existe pas`;
        for (const n in TypeContactService.t_types) {

            const element: TypeContact = TypeContactService.t_types[n] as TypeContact
            if (id.padStart(2, '0') === element.id) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(type:TypeContact): TypeContact | string {
        const newcontact: TypeContact | undefined = TypeContact.Create(type.libele, type.details);

        if (newcontact !== undefined) {
            TypeContactService.t_types.push(newcontact)
            console.log(TypeContactService.t_types);
            
        }

        return newcontact ? newcontact : 'no contact made';
    }

    public Modifier(id: string, type: TypeContact): TypeContact {
        const idx: number = TypeContactService.t_types.findIndex((tps) => tps.id === id.padStart(2, '0'));
        TypeContactService.t_types[idx].Modifier(type.libele,type.details);
        return TypeContactService.t_types[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = TypeContactService.t_types.findIndex((type) => type.id === id.padStart(2, '0'));
        if (TypeContactService.t_types[idx]) {
            TypeContactService.t_types.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }

}
