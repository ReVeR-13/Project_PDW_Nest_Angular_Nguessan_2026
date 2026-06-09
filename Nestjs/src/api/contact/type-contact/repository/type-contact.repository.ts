import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeContactEntity } from "../entity/type-contact.entity";
import { ExistException, NotFoundException } from "../../../../home/index";
import { Repository } from "typeorm";

@Injectable()
export class TypeAnimalRepository{

    constructor(
        @InjectRepository(TypeContactEntity) 
        private readonly repo: Repository<TypeContactEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<TypeContactEntity[]> {
        const types : TypeContactEntity[] = await this.repo.find({
        });
        return types ;
    }

    public async findById(id?:string) : Promise<TypeContactEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    public async findBynom(nom?:string) : Promise<TypeContactEntity | null>{
        return await this.repo.findOne({where:{nom}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(type:Partial<TypeContactEntity>): Promise<TypeContactEntity | null>{
        if(await this.findById(type.id) !== null){
            throw new ExistException();
        }
        const new_type: TypeContactEntity = this.repo.create(type)
        this.repo.save(new_type);
        return new_type;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,type:Partial<TypeContactEntity>): Promise<TypeContactEntity | null>{
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