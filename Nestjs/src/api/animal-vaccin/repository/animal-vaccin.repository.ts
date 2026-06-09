import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnimalVaccinEntity } from "../entity/animal-vaccin.entity";
import { Repository } from "typeorm";
import { AnimalEntity } from "api/animal/entities/animal.entity";
import { VaccinEntity } from "api/vaccin/entity/vaccin.entity";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class AnimalVaccinRepository{

    constructor(
        @InjectRepository(AnimalVaccinEntity) 
        private readonly repo: Repository<AnimalVaccinEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<AnimalVaccinEntity[]> {
        const types : AnimalVaccinEntity[] = await this.repo.find();
        return types ;
    }

    public async findByAnimal(animal:AnimalEntity):Promise<AnimalVaccinEntity[]> {
        const types : AnimalVaccinEntity[] = await this.repo.find({
            where:{animal}
        });
        return types ;
    }

    public async findByVaccin(vaccin:VaccinEntity):Promise<AnimalVaccinEntity[]> {
        const types : AnimalVaccinEntity[] = await this.repo.find({
            where:{vaccin}
        });
        return types ;
    }

    public async findById(id?:string) : Promise<AnimalVaccinEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<AnimalVaccinEntity>): Promise<AnimalVaccinEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: AnimalVaccinEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<AnimalVaccinEntity>): Promise<AnimalVaccinEntity | null>{
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