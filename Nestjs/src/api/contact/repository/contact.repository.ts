import { ExistException, NotFoundException } from "home/app.exception";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactEntity } from "../entity/contact.entity";



@Injectable()
export class ContactRepository{

    constructor(
        @InjectRepository(ContactEntity) 
        private readonly repo: Repository<ContactEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<ContactEntity[]> {
        const animals : ContactEntity[] = await this.repo.find();
        return animals ;
    }

    public async findById(id?:string) : Promise<ContactEntity | null>{
        return await this.repo.findOne({where:{id}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(contact:Partial<ContactEntity>): Promise<ContactEntity | null>{
        if(await this.findById(contact.id) !== null){
            throw new ExistException();
        }
        const new_c: ContactEntity = this.repo.create(contact)
        this.repo.save(new_c);
        return new_c;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,contact:Partial<ContactEntity>): Promise<ContactEntity | null>{
        if(this.findById(contact.id) === null){
            throw new NotFoundException();
        }
        this.repo.update(id,contact)
        return await this.findById(id);
    }

    //------------------------------------------------------------
    //  DELETE
    //------------------------------------------------------------

    public async delete(id:string):Promise<1|0>{
        let ret : 1|0 = 0;
        if (await this.findById(id) !== null) {
            this.repo.delete(id);
            ret = 1;
        }
        return ret;
    }

}