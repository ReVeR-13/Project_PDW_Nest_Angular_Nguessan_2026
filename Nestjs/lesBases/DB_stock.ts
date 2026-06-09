
import {
    Adoption, 
    Compatibilite, 
    Contact, 
    Demande, 
    Entree, 
    MotifEntree, 
    MotifSortie, 
    Sortie, 
    StatutDemande, 
    TypeContact,
    TypeDemande,
    Vaccin
} from "home";
import {Animal,StatutAnimal,TypeAnimal} from '../src/api/animal'
import data from '../Helper/contact_test.json'
import { Abri } from "api/abri";
import { TypeContact_Contact } from "api/contact/type-contact-contact/TypeContact_Contact";
import { AnimalCompatibilite } from "api/animal-compatibilite/AnimalCompatibilite";
import { AnimalVaccin } from "api/animal-vaccin/AnimalVaccin";
import { Accueil } from "api/accueil/Accueil";
import { Couleur } from "api/couleur/Couleur";
import { AbriEntity } from "api/abri/entity/abri.entity";

export  class  DataG{

    static DataPreparation(): Contact[] {
        let retval:Contact[] = [];
        Object.keys(data).forEach(el =>{
            retval.push(data[el] as Contact);
        })
        return retval;
    }

    public static t_adoption: Adoption[] = [];
    public static t_accueil: Accueil[] = [];
    public static t_couleur: Couleur[] = [];

    public static t_animal: Animal[] = [];
    public static t_abri: Abri[] = [];
    public static t_statutAnimal: StatutAnimal[] = [];
    public static t_typesAnimal: TypeAnimal[] = [];

    public static t_compatibilite: Compatibilite[] = [];
    public static t_animal_compatibilite: AnimalCompatibilite[] = [];

    public static t_typesContact : TypeContact[] = [];
    public static t_Contact : Contact[] = this.DataPreparation();
    public static t_typeContact_Contact : TypeContact_Contact[] = []

    public static t_demande: Demande[] = [];
    public static t_statutDemande: StatutDemande[] = [];
    public static t_typesDemande: TypeDemande[] = [];

    public static t_motifEntree : MotifEntree[] = [];
    public static t_entree: Entree[] = [];

    public static t_motifSortie: MotifSortie[] = [];
    public static t_sortie: Sortie[] = [];

    public static t_vaccin: Vaccin[] = [];
    public static t_animal_vaccin: AnimalVaccin[] = [];

}