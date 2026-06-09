import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MotifSortieEntity } from "../entity/motif-sortie.entity";
import { Repository } from "typeorm";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class MotifSortieRepository{

    constructor(
        @InjectRepository(MotifSortieEntity) 
        private readonly repo: Repository<MotifSortieEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<MotifSortieEntity[]> {
        const types : MotifSortieEntity[] = await this.repo.find();
        return types ;
    }

    public async findById(id?:string) : Promise<MotifSortieEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    public async findBynom(nom?:string) : Promise<MotifSortieEntity | null>{
        return await this.repo.findOne({where:{nom}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<MotifSortieEntity>): Promise<MotifSortieEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: MotifSortieEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<MotifSortieEntity>): Promise<MotifSortieEntity | null>{
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