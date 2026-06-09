import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SortieEntity } from "../entity/sortie.entity";
import { Repository } from "typeorm";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { MotifSortieEntity } from "../motif-sortie/entity/motif-sortie.entity";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class SortieRepository{

    constructor(
        @InjectRepository(SortieEntity) 
        private readonly repo: Repository<SortieEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<SortieEntity[]> {
        const types : SortieEntity[] = await this.repo.find();
        return types ;
    }

    public async findByDemande(demande:DemandeEntity):Promise<SortieEntity[]> {
        const types : SortieEntity[] = await this.repo.find({
            where:{demande}
        });
        return types ;
    }

    public async findByMotif(motif:MotifSortieEntity):Promise<SortieEntity[]> {
        const types : SortieEntity[] = await this.repo.find({
            where:{motif}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<SortieEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<SortieEntity>): Promise<SortieEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: SortieEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<SortieEntity>): Promise<SortieEntity | null>{
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