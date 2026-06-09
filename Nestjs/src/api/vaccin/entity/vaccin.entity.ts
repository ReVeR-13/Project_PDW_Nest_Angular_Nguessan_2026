import { AnimalVaccinEntity } from "api/animal-vaccin/entity/animal-vaccin.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 't_vaccin' })
export class VaccinEntity {

    @PrimaryColumn({ name: 'id_vaccin', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update: false })
    dateCreation: Date;

    @Column({ name: 'nom_vaccin', type: 'varchar', nullable: false, unique:true })
    nom: string;

    @Column({ name: 'remarque', type: 'varchar', nullable: true })
    remarque: string;

    //------------------------------------------------------------
    //  RELATION AVEC ANIMAL
    //------------------------------------------------------------

    @OneToMany(() => AnimalVaccinEntity, (connexion):any => connexion.vaccin, {
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_vaccin' })
    connexions: AnimalVaccinEntity[];


}