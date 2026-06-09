import { Repository } from "typeorm";
import { TypeContactConnexionEntity } from "../entity/type-contact-connexion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ExistException, NotFoundException } from "home/app.exception";

@Injectable()
export class TypeContact_ContactRepository{

    constructor(
        @InjectRepository(TypeContactConnexionEntity) 
        private readonly repo: Repository<TypeContactConnexionEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<TypeContactConnexionEntity[]> {
        const animals : TypeContactConnexionEntity[] = await this.repo.find();
        return animals ;
    }

    public async findById(id?:string) : Promise<TypeContactConnexionEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<TypeContactConnexionEntity>): Promise<TypeContactConnexionEntity | null>{
        if(await this.findById(element.id) !== null){
            throw new ExistException();
        }
        const new_element: TypeContactConnexionEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:Partial<TypeContactConnexionEntity>): Promise<TypeContactConnexionEntity | null>{
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