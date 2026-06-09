import { InjectRepository } from "@nestjs/typeorm";
import { TypeAnimalEntity } from "../entity/type-animal.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ExistException, NotFoundException } from "home/app.exception";


@Injectable()
export class TypeAnimalRepository{

    constructor(
        @InjectRepository(TypeAnimalEntity) 
        private readonly repo: Repository<TypeAnimalEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<TypeAnimalEntity[]> {
        const types : TypeAnimalEntity[] = await this.repo.find({
            relations:['animaux']
        });
        return types ;
    }

    public async findById(id?:string) : Promise<TypeAnimalEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    public async findBynom(nom?:string) : Promise<TypeAnimalEntity | null>{
        return await this.repo.findOne({where:{nom}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(type:Partial<TypeAnimalEntity>): Promise<TypeAnimalEntity | null>{
        if(await this.findById(type.id) !== null){
            throw new ExistException();
        }
        const new_type: TypeAnimalEntity = this.repo.create(type)
        this.repo.save(new_type);
        return new_type;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,type:Partial<TypeAnimalEntity>): Promise<TypeAnimalEntity | null>{
        if(this.findById(type.id) === null){
            throw new NotFoundException();
        }
        this.repo.update(id,type)
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