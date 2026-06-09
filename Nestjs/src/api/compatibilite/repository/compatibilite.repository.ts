import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompatibiliteEntity } from "../entity/compatibilite.entity";
import { Repository } from "typeorm";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class CompatibiliteRepository{

    constructor(
        @InjectRepository(CompatibiliteEntity) 
        private readonly repo: Repository<CompatibiliteEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<CompatibiliteEntity[]> {
        const types : CompatibiliteEntity[] = await this.repo.find({
        });
        return types ;
    }

    public async findById(id?:string) : Promise<CompatibiliteEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    public async findBynom(nom?:string) : Promise<CompatibiliteEntity | null>{
        return await this.repo.findOne({where:{nom}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<CompatibiliteEntity>): Promise<CompatibiliteEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: CompatibiliteEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<CompatibiliteEntity>): Promise<CompatibiliteEntity | null>{
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