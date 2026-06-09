import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdoptionEntity } from "../Entity/adoption.entity";
import { Repository } from "typeorm";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class AdoptionRepository{

    constructor(
        @InjectRepository(AdoptionEntity) 
        private readonly repo: Repository<AdoptionEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<AdoptionEntity[]> {
        const types : AdoptionEntity[] = await this.repo.find();
        return types ;
    }

    public async findByDemande(demande:DemandeEntity):Promise<AdoptionEntity[]> {
        const types : AdoptionEntity[] = await this.repo.find({
            where:{demande}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<AdoptionEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<AdoptionEntity>): Promise<AdoptionEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: AdoptionEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<AdoptionEntity>): Promise<AdoptionEntity | null>{
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