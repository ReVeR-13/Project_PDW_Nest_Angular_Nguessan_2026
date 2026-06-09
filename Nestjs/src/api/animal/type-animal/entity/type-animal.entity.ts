import { AnimalEntity } from "api/animal/entities/animal.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";


@Entity({ name: 't_type_animal' })
export class TypeAnimalEntity {
    @PrimaryColumn({ name: 'id_type', type: 'varchar', nullable: false })
    id: string;

    /*@BeforeInsert()
    generateId(){
        this.id = ulid();
    }*/

    @CreateDateColumn({ name: 'date_creation', type: 'date', nullable: false })
    dateCreation: Date;

    @Column({ name: 'nom_type', type: 'varchar', nullable: false, unique: true })
    nom: string;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string;

    @OneToMany(() => AnimalEntity, (animal) => animal.typeAnimal,{
        eager:false
    })
    animaux: AnimalEntity[];
}