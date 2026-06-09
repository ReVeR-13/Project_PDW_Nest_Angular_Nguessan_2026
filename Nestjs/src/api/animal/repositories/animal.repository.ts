
import { ExistException, NotFoundException } from "home/app.exception";
import { AnimalEntity } from "../entities/animal.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class AnimalRepository{

    constructor(
        @InjectRepository(AnimalEntity) 
        private readonly repo: Repository<AnimalEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<AnimalEntity[]> {
        const animals : AnimalEntity[] = await this.repo.find();
        return animals ;
    }

    public async findById(id?:string) : Promise<AnimalEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(animal:Partial<AnimalEntity>): Promise<AnimalEntity | null>{
        if(await this.findById(animal.id) !== null){
            throw new ExistException();
        }
        const new_animal: AnimalEntity = this.repo.create(animal)
        this.repo.save(new_animal);
        return new_animal;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,animal:Partial<AnimalEntity>): Promise<AnimalEntity | null>{
        if(this.findById(animal.id) === null){
            throw new NotFoundException();
        }
        this.repo.update(id,animal)
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