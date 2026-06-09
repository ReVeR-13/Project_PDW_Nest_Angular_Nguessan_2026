import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbriEntity } from "../entity/abri.entity";
import { Repository } from "typeorm";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class AbriRepository{

    constructor(
        @InjectRepository(AbriEntity) 
        private readonly repo: Repository<AbriEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<AbriEntity[]> {
        const types : AbriEntity[] = await this.repo.find({
        });
        return types ;
    }

    public async findById(id?:string) : Promise<AbriEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    public async findBynom(nom?:string) : Promise<AbriEntity | null>{
        return await this.repo.findOne({where:{nom}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<AbriEntity>): Promise<AbriEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: AbriEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<AbriEntity>): Promise<AbriEntity | null>{
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