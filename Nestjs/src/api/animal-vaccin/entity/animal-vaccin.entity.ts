import { AnimalEntity } from "api/animal/entities/animal.entity";
import { VaccinEntity } from "api/vaccin/entity/vaccin.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 't_animal_vaccin' })
export class AnimalVaccinEntity {

    @PrimaryColumn({ name: 'id_anim_vaccin', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update: false })
    dateCreation: Date;

    @Column({ name: 'remarque', type: 'varchar', nullable: true })
    remarque: string;

    //------------------------------------------------------------
    //  RELATION AVEC ANIMAL
    //------------------------------------------------------------

    @ManyToOne(() => AnimalEntity, (animal):any => animal.vaccins, {
        nullable: false,     // Un animal a un type obligatoirement
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_animal' })
    animal: AnimalEntity;

    //------------------------------------------------------------
    //  RELATION AVEC VACCIN
    //------------------------------------------------------------

    @ManyToOne(() => VaccinEntity, (vaccin):any => vaccin.connexions, {
        nullable: false,     
        onDelete: 'RESTRICT' 
    })
    @JoinColumn({ name: 'id_vaccin' })
    vaccin: VaccinEntity;
}