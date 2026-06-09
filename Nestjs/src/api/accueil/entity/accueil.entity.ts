import { StatutValidation } from "api/demande";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 't_accueil' })
export class AccueilEntity {

    @PrimaryColumn({ name: 'id_accueil', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update: false })
    dateCreation: Date;

    @Column({ name: 'details', type: 'varchar', nullable: true })
    details: string;

    @Column({ name: 'statut', type: 'enum', nullable: false, enum:StatutValidation, enumName:'e_statut_accueil' })
    statut: StatutValidation;

    @Column({ name: 'date_debut', type: 'date', nullable: true })
    dateDebut: Date;

    @Column({ name: 'date_fin', type: 'date', nullable: true })
    dateFin: Date;

    @Column({ name: 'raison_refus', type: 'varchar', nullable: true })
    refus: string;

    //------------------------------------------------------------
    //  RELATION AVEC DEMANDE
    //------------------------------------------------------------

    @OneToOne(() => DemandeEntity, (demande):any => demande.id, {
        eager:true,
        nullable: false,     // Un animal a un type obligatoirement
        cascade:true,
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_demande' })
    demande: DemandeEntity;

}