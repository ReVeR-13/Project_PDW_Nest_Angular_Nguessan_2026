import { Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Sexe, StatutAnimal } from "../Animal";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { TypeAnimalEntity } from "../type-animal/entity/type-animal.entity";
import { AbriEntity } from "api/abri/entity/abri.entity";
import { AnimalCompatibiliteEntity } from "api/animal-compatibilite/entity/animal-compatibilite.entity";
import { AnimalVaccinEntity } from "api/animal-vaccin/entity/animal-vaccin.entity";

 @Entity({name:'t_animal'})
 export class AnimalEntity {
    @PrimaryColumn({name :'id_animal',type:'varchar', nullable: false})
    id:string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({name: 'date_creation',type:'date', nullable:false})
    dateCreation: Date;

    @Column({name: 'nom_animal',type: 'varchar', nullable: false})
    nom:string;

    @Column({name:'date_naissance',type: 'date', nullable:false})
    dateNaissance:Date;

    @Column({name: 'sexe', enum:  Sexe, type: 'enum',nullable: false, enumName:'e_sexe'})
    sexe:Sexe;

    @Column({name: 'couleur',type:'varchar',nullable:true})
    couleur:string;

    @Column({name: 'date_deces', type: 'date',nullable:true})
    dateDeces:Date;

    @Column({name: 'sterile', type: 'boolean',nullable:false, default:false})
    sterile:boolean;

    @Column({name: 'date_sterile', type: 'date',nullable:true})
    dateSterile:Date;

    @Column({name: 'particularité', type: 'varchar',nullable:true})
    particularité:string;

    @Column({name: 'description', type: 'varchar',nullable:true})
    description:string;

    @Column({name: 'statut', type: 'enum', nullable:false,enum: StatutAnimal , enumName:'e_statut_animal'})
    statut:StatutAnimal;

    //------------------------------------------------------------
    //  RELATION AVEC TYPE ANIMAL
    //------------------------------------------------------------

    @ManyToOne(()=> TypeAnimalEntity , (typeAnimal) => typeAnimal.animaux,{
        eager:true,         // Charge automatiquement le type
        nullable:false,     // Un animal a un type obligatoirement
        onDelete:'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({name: 'id_type_animal'})
    typeAnimal:TypeAnimalEntity;

    //------------------------------------------------------------
    //  RELATION AVEC LES DEMANDES
    //------------------------------------------------------------

    @OneToMany(()=> DemandeEntity, (demande) => demande.animal)
    demandes : DemandeEntity[];

    //------------------------------------------------------------
    //  RELATION AVEC ABRI
    //------------------------------------------------------------

    @ManyToOne(()=> AbriEntity , (abri) => abri.animaux,{
        eager:true,         // Charge automatiquement le type
        nullable:false,     // Un animal a un type obligatoirement
        onDelete:'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({name: 'id_abri'})
    abri:AbriEntity;

    //------------------------------------------------------------
    //  RELATION AVEC COMPATIBILITE
    //------------------------------------------------------------

    @OneToMany(()=> AnimalCompatibiliteEntity , (compatibilite) => compatibilite.animal,{
        eager:true,         
        onDelete:'CASCADE'  
    })
    compatibilites: AnimalCompatibiliteEntity [];

    //------------------------------------------------------------
    //  RELATION AVEC VACCIN
    //------------------------------------------------------------

    @OneToMany(()=> AnimalVaccinEntity , (vaccin) => vaccin.animal,{
        eager:true,         
        cascade:true,         
        onDelete:'CASCADE'  
    })
    vaccins: AnimalVaccinEntity [];
 }