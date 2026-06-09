import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { StatutAbri } from "../Abri";
import { AnimalEntity } from "api/animal/entities/animal.entity";

@Entity({name: 't_abri'})
export class AbriEntity {

    @PrimaryColumn({ name: 'id_abri', type: 'varchar', nullable: false })
    id: string;

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update:false })
    dateCreation: Date;

    @Column({name:'nom_abri',type: 'varchar', nullable: false, unique:true})
    nom: string;

    @Column({name:'description',type: 'varchar', nullable: true})
    description: string;

    @Column({name:'statut',type: 'enum', enum:StatutAbri ,enumName:'e_statut_abri' ,nullable: false})
    statut: StatutAbri;

    //------------------------------------------------------------
    //  RELATION AVEC ANIMAL
    //------------------------------------------------------------
    @JoinColumn({ name: 'id_abri' })
    animaux: AnimalEntity[];

}