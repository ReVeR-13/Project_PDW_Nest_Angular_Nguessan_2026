import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CouleurEntity } from "../entity/couleur.entity";
import { Repository } from "typeorm";
import { ExistException, NotFoundException } from "home";

@Injectable()
export class CouleurRepository{

    constructor(
        @InjectRepository(CouleurEntity) 
        private readonly repo: Repository<CouleurEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<CouleurEntity[]> {
        const couleur : CouleurEntity[] = await this.repo.find();
        return couleur ;
    }

    public async findById(id?:string) : Promise<CouleurEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(couleur:Partial<CouleurEntity>): Promise<CouleurEntity | null>{
        if(await this.findById(couleur.id) !== null){
            throw new ExistException();
        }
        const new_c: CouleurEntity = this.repo.create(couleur)
        this.repo.save(new_c);
        return new_c;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,couleur:Partial<CouleurEntity>): Promise<CouleurEntity | null>{
        if(this.findById(couleur.id) === null){
            throw new NotFoundException();
        }
        this.repo.update(id,couleur)
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