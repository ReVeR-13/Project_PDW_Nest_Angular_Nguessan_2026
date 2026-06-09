import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CredentialEntity } from "./credential.entity";
import { Exclude } from "class-transformer";

@Entity({ name: 't_token' })
export class TokenEntity {

    @PrimaryColumn({ name: 'id', length: 26, type: 'varchar', unique: true ,update:false})
    token_id: string;

    @Column({ name: 'date_creation', type: 'date', nullable: false })
    dateCreation: Date;

    @Column({ name: 'valeur', type: 'varchar', nullable: false, unique: true })
    token: string;
    
    @Exclude({toPlainOnly:true})
    @Column({ name: 'refresh_valeur', type: 'varchar', nullable: false, unique: true })
    refreshToken: string;

    //------------------------------------------------------------
    //  RELATION AVEC UTILISATEUR
    //------------------------------------------------------------
    @OneToOne(() => CredentialEntity, (element) => element.id, {
        eager: true,
        nullable:false,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    credential: CredentialEntity
}