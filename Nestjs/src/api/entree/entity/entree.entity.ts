import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { MotifEntreeEntity } from "../motif-entree/entity/motif-entree.entity";

@Entity({name: 't_entree'})
export class EntreeEntity {

    @PrimaryColumn({ name: 'id_entree', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update:false })
    dateCreation: Date;

    @Column({name:'details',type: 'varchar', nullable: true})
    description: string;

    //------------------------------------------------------------
    //  RELATION AVEC DEMANDE
    //------------------------------------------------------------
    @OneToOne(()=> DemandeEntity ,(demande) => demande.id,{
        eager:true,
        cascade:true,
        nullable:false,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name:'id_demande'})
    demande: DemandeEntity;

    //------------------------------------------------------------
    //  RELATION AVEC MOTIF
    //------------------------------------------------------------
    @ManyToOne(()=> MotifEntreeEntity ,(motif) => motif.demandes,{
        eager:true,
        cascade:true,
        nullable:false,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name:'id_motif'})
    motif: MotifEntreeEntity;
}