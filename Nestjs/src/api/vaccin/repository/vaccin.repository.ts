import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VaccinEntity } from "../entity/vaccin.entity";
import { Repository } from "typeorm";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class EntreeRepository{

    constructor(
        @InjectRepository(VaccinEntity) 
        private readonly repo: Repository<VaccinEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<VaccinEntity[]> {
        const types : VaccinEntity[] = await this.repo.find();
        return types ;
    }

    public async findById(id?:string) : Promise<VaccinEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    public async findByNom(nom?:string) : Promise<VaccinEntity | null>{
        return await this.repo.findOne({where:{nom}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<VaccinEntity>): Promise<VaccinEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: VaccinEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<VaccinEntity>): Promise<VaccinEntity | null>{
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