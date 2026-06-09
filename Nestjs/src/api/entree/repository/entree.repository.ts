import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntreeEntity } from "../entity/entree.entity";
import { Repository } from "typeorm";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { MotifEntreeEntity } from "../motif-entree/entity/motif-entree.entity";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class EntreeRepository{

    constructor(
        @InjectRepository(EntreeEntity) 
        private readonly repo: Repository<EntreeEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<EntreeEntity[]> {
        const types : EntreeEntity[] = await this.repo.find();
        return types ;
    }

    public async findByDemande(demande:DemandeEntity):Promise<EntreeEntity[]> {
        const types : EntreeEntity[] = await this.repo.find({
            where:{demande}
        });
        return types ;
    }

    public async findByMotif(motif:MotifEntreeEntity):Promise<EntreeEntity[]> {
        const types : EntreeEntity[] = await this.repo.find({
            where:{motif}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<EntreeEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<EntreeEntity>): Promise<EntreeEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: EntreeEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<EntreeEntity>): Promise<EntreeEntity | null>{
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