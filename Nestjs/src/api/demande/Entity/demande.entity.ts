
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";
import { StatutDemande, TypeDemande } from "../Demande";
import { ContactEntity } from "api/contact/entity/contact.entity";
import { AnimalEntity } from "api/animal/entities/animal.entity";

@Entity({ name: 't_demande' })
export class DemandeEntity {
    @PrimaryColumn({ name: 'id_demande', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId() {
        this.id = ulid();
    }*/

    @Column( {name:'date_ouverture' ,type:'date',  nullable: false })
    dateOuverture: Date;

    @Column({ name:'date_fermeture',type:'date' , nullable: false })
    dateFermerture?: Date;

    @Column({ name: 'id_animal', type:'varchar', length: 15 , nullable: false })
    id_animal: string;

    @Column({name: 'id_contact', type:'varchar', length: 15 , nullable: false })
    id_contact: string;

    @Column({name: 'type', type: 'enum', nullable:false,enum: TypeDemande , default: TypeDemande.INFO})
    type: TypeDemande;

    @Column({name: 'statut', type: 'enum', nullable:false,enum: StatutDemande , default: StatutDemande.EXAMINATION})
    statut: StatutDemande;

    @Column({name:'details', type:'varchar', nullable: true })
    details: string;

    @ManyToOne(()=> ContactEntity, (contact) => contact.demandes, {
        eager:true,
        nullable:false,
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'id_contact'})
    contact:ContactEntity;

    @ManyToOne(()=> AnimalEntity, (animal) => animal.demandes, {
        eager:true,
        nullable: false,
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'id_animal'})
    animal:AnimalEntity;


}

