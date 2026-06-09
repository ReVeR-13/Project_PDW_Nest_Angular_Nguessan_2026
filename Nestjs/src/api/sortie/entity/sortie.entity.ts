import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { MotifSortieEntity } from "../motif-sortie/entity/motif-sortie.entity";

@Entity({name: 't_sortie'})
export class SortieEntity {

    @PrimaryColumn({ name: 'id_sortie', type: 'varchar', nullable: false })
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
    @ManyToOne(()=> MotifSortieEntity ,(motif) => motif.demandes,{
        eager:true,
        cascade:true,
        nullable:false,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name:'id_motif'})
    motif: MotifSortieEntity;
}