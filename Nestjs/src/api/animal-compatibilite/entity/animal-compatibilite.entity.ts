import { AnimalEntity } from "api/animal/entities/animal.entity";
import { CompatibiliteEntity } from "api/compatibilite/entity/compatibilite.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 't_animal_compatibilite' })
export class AnimalCompatibiliteEntity {

    @PrimaryColumn({ name: 'id_anim_cmp', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update: false })
    dateCreation: Date;

    @Column({ name: 'valeur', type: 'boolean', nullable: false })
    valeur: boolean;

    @Column({ name: 'remarque', type: 'varchar', nullable: true })
    remarque: string;

    //------------------------------------------------------------
    //  RELATION AVEC ANIMAL
    //------------------------------------------------------------

    @ManyToOne(() => AnimalEntity, (animal):any => animal.compatibilites, {
        nullable: false,     // Un animal a un type obligatoirement
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_animal' })
    animal: AnimalEntity;

    //------------------------------------------------------------
    //  RELATION AVEC COMPATIBILITE
    //------------------------------------------------------------

    @ManyToOne(() => CompatibiliteEntity, (compatibilite):any => compatibilite.connexion, {
        nullable: false,     // Un animal a un type obligatoirement
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_compatibilite' })
    compatibilite: CompatibiliteEntity;

}