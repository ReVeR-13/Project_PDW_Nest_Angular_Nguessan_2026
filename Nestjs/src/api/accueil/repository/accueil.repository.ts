import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccueilEntity } from "../entity/accueil.entity";
import { Repository } from "typeorm";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class AccueilRepository{

    constructor(
        @InjectRepository(AccueilEntity) 
        private readonly repo: Repository<AccueilEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<AccueilEntity[]> {
        const types : AccueilEntity[] = await this.repo.find();
        return types ;
    }

    public async findByDemande(demande:DemandeEntity):Promise<AccueilEntity[]> {
        const types : AccueilEntity[] = await this.repo.find({
            where:{demande}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<AccueilEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<AccueilEntity>): Promise<AccueilEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: AccueilEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<AccueilEntity>): Promise<AccueilEntity | null>{
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