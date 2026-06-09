import { IsNotEmpty, IsString} from 'class-validator'
import { StatutDemande, TypeDemande } from '../Demande';

export class CreateDemandeDto {
    
    @IsString({message: `l'id d'un animale existant`})
    id_animal: string;

    @IsString({message: `l'id d'un contact existant`})
    @IsNotEmpty({message:`Champs obligatoir`})
    id_contact: string;

    @IsString()
    @IsNotEmpty({message:`Champs obligatoir`})
    type: TypeDemande;

    @IsString()
    @IsNotEmpty({message:`Champs obligatoir`})
    statut: StatutDemande;

    @IsString()
    details: string;

}