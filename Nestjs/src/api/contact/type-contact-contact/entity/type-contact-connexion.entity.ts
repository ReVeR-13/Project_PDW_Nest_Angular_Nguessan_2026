import { ContactEntity } from "api/contact/entity/contact.entity";
import { TypeContactEntity } from "../../type-contact/entity/type-contact.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: 't_contact_typecontact'})
export class TypeContactConnexionEntity {

    @PrimaryColumn({ name: 'id_ct_tpecont', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false })
    dateCreation: Date;

    //------------------------------------------------------------
    //  RELATION AVEC CONTACT
    //------------------------------------------------------------

    @ManyToOne(() => ContactEntity, (contact) => contact.connexion, {
        eager: true,         // Charge automatiquement le type
        nullable: false,     // Un animal a un type obligatoirement
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_contact' })
    contact: ContactEntity;

    //------------------------------------------------------------
    //  RELATION AVEC ROLE
    //------------------------------------------------------------

    @ManyToOne(() => TypeContactEntity, (t) => t.connexion, {
        eager: true,         // Charge automatiquement le type
        nullable: false,     // Un animal a un type obligatoirement
        onDelete: 'RESTRICT' // Evite de supprimer un type utilisé
    })
    @JoinColumn({ name: 'id_type_contact' })
    type: TypeContactEntity;
}