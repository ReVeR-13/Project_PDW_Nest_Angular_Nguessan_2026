import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 't_couleur' })
export class CouleurEntity {
    
    @PrimaryColumn({ name: 'id', type: 'varchar', nullable: false })
    id: string;

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update:false })
    dateCreation: Date;

    @Column({ name: 'valeur', type: 'varchar', nullable: false, unique:true })
    nom: string;
}