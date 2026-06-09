
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TypeContactConnexionEntity } from "../type-contact-contact/entity/type-contact-connexion.entity";


@Entity({ name: 't_contact' })
export class ContactEntity {
    
    @PrimaryColumn({ name: 'id_contact', type: 'varchar', nullable: false })
    id: string;

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false, update:false })
    dateCreation: Date;

    @Column({ name: 'nom_contact', type: 'varchar', nullable: false })
    nom: string;

    @Column({ name: 'prenom_contact', type: 'varchar', nullable: true })
    prenom: string;

    @Column({ name: 'niss', type: 'varchar', nullable: false, length: 11 })
    niss: string;

    @Column({ name: 'gsm', type: 'varchar', nullable: false, length: 10 })
    gsm: string;

    @Column({ name: 'tel', type: 'varchar', nullable: false, length: 10 })
    telephone: string;

    @Column({ name: 'mail', type: 'varchar', nullable: true })
    mail: string;

    @Column({ name: 'code_postale', type: 'varchar', nullable: true })
    codePostale: string;

    @Column({ name: 'localité', type: 'varchar', nullable: true })
    localite: string;

    @Column({ name: 'adresse', type: 'varchar', nullable: true })
    rue: string;

    @Column({ name: 'date_naissance', type: 'date', nullable: true })
    dateNaissance: Date;

    @OneToMany(() => TypeContactConnexionEntity, (connexion):any => connexion.contact,{
        cascade:false,
    })
    connexion: TypeContactConnexionEntity[];


    @OneToMany(() => DemandeEntity, (demande):any => demande.contact,{
        cascade:true,
    })
    demandes: DemandeEntity[];
}