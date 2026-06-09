import { Exclude } from "class-transformer";
import { CreateDateColumn } from "typeorm";

export abstract class BaseEntity{

    @Exclude({toPlainOnly:true})
    @CreateDateColumn()
    dateCreation:Date;

    @Exclude({toPlainOnly:true})
    @CreateDateColumn()
    dateModification:Date;
}