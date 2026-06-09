import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 't_motif_sortie'})
export class MotifSortieEntity {

    @PrimaryColumn({ name: 'id_motif', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update:false })
    dateCreation: Date;

    @Column({name:'libele',type: 'varchar', nullable: false, unique:true})
    nom: string;

    @Column({name:'description',type: 'varchar', nullable: true})
    description: string;

    //------------------------------------------------------------
    //  RELATION AVEC ANIMAL
    //------------------------------------------------------------
    demandes: DemandeEntity[];


}