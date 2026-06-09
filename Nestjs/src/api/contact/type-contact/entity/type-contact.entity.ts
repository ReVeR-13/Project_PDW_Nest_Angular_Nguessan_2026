
import { TypeContactConnexionEntity } from "api/contact/type-contact-contact/entity/type-contact-connexion.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";



@Entity({ name: 't_type_contact' })
export class TypeContactEntity {
    @PrimaryColumn({ name: 'id_type', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false })
    dateCreation: Date;

    @Column({ name: 'libele', type: 'varchar', nullable: false, unique: true })
    nom: string;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string;
    
    connexion: TypeContactConnexionEntity[];

}