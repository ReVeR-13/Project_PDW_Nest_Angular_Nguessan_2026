import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnimalCompatibiliteEntity } from "../entity/animal-compatibilite.entity";
import { Repository } from "typeorm";
import { AnimalEntity } from "api/animal/entities/animal.entity";
import { CompatibiliteEntity } from "api/compatibilite/entity/compatibilite.entity";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class AnimalCompatibiliteRepository{

    constructor(
        @InjectRepository(AnimalCompatibiliteEntity) 
        private readonly repo: Repository<AnimalCompatibiliteEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<AnimalCompatibiliteEntity[]> {
        const types : AnimalCompatibiliteEntity[] = await this.repo.find();
        return types ;
    }

    public async findByAnimal(animal:AnimalEntity):Promise<AnimalCompatibiliteEntity[]> {
        const types : AnimalCompatibiliteEntity[] = await this.repo.find({
            where:{animal}
        });
        return types ;
    }

    public async findByCompatibilite(compatibilite:CompatibiliteEntity):Promise<AnimalCompatibiliteEntity[]> {
        const types : AnimalCompatibiliteEntity[] = await this.repo.find({
            where:{compatibilite}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<AnimalCompatibiliteEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<AnimalCompatibiliteEntity>): Promise<AnimalCompatibiliteEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: AnimalCompatibiliteEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<AnimalCompatibiliteEntity>): Promise<AnimalCompatibiliteEntity | null>{
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