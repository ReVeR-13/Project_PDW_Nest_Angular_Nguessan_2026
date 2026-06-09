import { AnimalCompatibiliteEntity } from "api/animal-compatibilite/entity/animal-compatibilite.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 't_compatibilite' })
export class CompatibiliteEntity {

    @PrimaryColumn({ name: 'id_compatibilite', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update: false })
    dateCreation: Date;

    @Column({ name: 'nom_compatibilite', type: 'varchar', nullable: false, unique: true })
    nom: string;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string;

    //------------------------------------------------------------
    //  RELATION AVEC COMPATIBILITE
    //------------------------------------------------------------

    @OneToMany(() => AnimalCompatibiliteEntity, (connexion): any => connexion.compatibilite, {
        nullable: false,     // Un animal a un type obligatoirement
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_compatibilite' })
    connexion: AnimalCompatibiliteEntity [];

}