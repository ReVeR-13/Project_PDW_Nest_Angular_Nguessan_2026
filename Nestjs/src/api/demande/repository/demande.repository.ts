import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DemandeEntity } from "../Entity/demande.entity";
import { Between, Repository } from "typeorm";
import { ContactEntity } from "api/contact/entity/contact.entity";
import { AnimalEntity } from "api/animal/entities/animal.entity";
import { StatutDemande, TypeDemande } from "../Demande";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class DemandeRepository{

    constructor(
        @InjectRepository(DemandeEntity) 
        private readonly repo: Repository<DemandeEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<DemandeEntity[]> {
        const types : DemandeEntity[] = await this.repo.find({
        });
        return types ;
    }

    public async findByContact(contact:ContactEntity):Promise<DemandeEntity[]> {
        const types : DemandeEntity[] = await this.repo.find({
            where:{contact}
        });
        return types ;
    }

    public async findByAnimal(animal:AnimalEntity):Promise<DemandeEntity[]> {
        const types : DemandeEntity[] = await this.repo.find({
            where:{animal}
        });
        return types ;
    }

    public async findByStatut(statut:StatutDemande):Promise<DemandeEntity[]> {
        const types : DemandeEntity[] = await this.repo.find({
            where:{statut}
        });
        return types ;
    }

    public async findByType(type:TypeDemande):Promise<DemandeEntity[]> {
        const types : DemandeEntity[] = await this.repo.find({
            where:{type}
        });
        return types ;
    }

    public async findByDate(debut:Date, fin: Date):Promise<DemandeEntity[]> {
        const types : DemandeEntity[] = await this.repo.find({
            where:{dateOuverture: Between(debut,fin)}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<DemandeEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<DemandeEntity>): Promise<DemandeEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: DemandeEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<DemandeEntity>): Promise<DemandeEntity | null>{
        if(this.findById(element.id) === null){
            throw new NotFoundException();
        }
        this.repo.update(id,element)
        return await this.findById(id);
    }

    //------------------------------------------------------------
    //  DELETE
    //------------------------------------------------------------

    public async delete(id:string):Promise<number>{
        let ret : number = 0;
        if (await this.findById(id) !== null) {
            this.repo.delete(id);
            ret = 1;
        }
        return ret;
    }

}