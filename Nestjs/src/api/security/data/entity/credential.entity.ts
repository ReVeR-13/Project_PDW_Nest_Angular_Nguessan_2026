import { idBuilderWithUlid } from "api/security/utils/id.builder";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
 
@Entity('t_utilisateur') 
export class CredentialEntity  { 

    @PrimaryColumn({name:'id',type:'varchar' ,length:26 ,default: () => `${idBuilderWithUlid()}`}) 
    id: string; 

    @Column({name:'username',length:50,nullable: false, unique: true,update:true}) 
    username: string;
    
    @Exclude({toPlainOnly:true})
    @Column({name:'password',nullable: false,update:true}) 
    password: string;

    @Column({name:'mail',nullable: false, unique: true}) 
    email: string;

    @Column({name:'isadmin',type:'boolean',default:false,nullable:false}) 
    isAdmin:boolean; 

    @Column({name:'active',type:'boolean',default: false,nullable:false}) 
    active: boolean;

    @CreateDateColumn({name:'date_creation',type:'date',nullable:false}) 
    created: Date;

    @CreateDateColumn({name:'date_modif',type:'date',update:true}) 
    updated: Date; 

    @Column({name: 'details',nullable: true}) 
    description: string;

    @Column({name: 'last_connection',nullable: true,default: new Date()}) 
    lastConnection: Date;
    
} 
