import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CredentialEntity } from "../entity/credential.entity";
import { Repository } from "typeorm";
import { ExistException, NullException, ParamInvalide } from "home/app.exception";
import { isNil } from "lodash";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class CredentialRepository{

    constructor(
        @InjectRepository(CredentialEntity) 
        private readonly repo: Repository<CredentialEntity>
    ){}

    //------------------------------------------------------------
    //  SEARCH
    //------------------------------------------------------------

    public async findAll():Promise<CredentialEntity[]> {
        const animals : CredentialEntity[] = await this.repo.find();
        return animals ;
    }

    public async findById(id?:string) : Promise<CredentialEntity | null>{
        if (isNil(id)) {
            throw new ParamInvalide();
        }
        return await this.repo.findOne({where:{id:id}})
    }

    public async findByUsername(username?:string) : Promise<CredentialEntity | null>{
        if (isNil(username)) {
            throw new ParamInvalide();
        }
        return await this.repo.findOne({where:{username:username}})
    }

    public async findByEmail(mail?:string) : Promise<CredentialEntity | null>{
        if (isNil(mail)) {
            throw new ParamInvalide();
        }
        return await this.repo.findOne({where:{email:mail}})
    }

    public async findByAdmin(isAdmin?:boolean) : Promise<CredentialEntity | null>{
        if (isNil(isAdmin)) {
            throw new ParamInvalide();
        }
        return await this.repo.findOne({where:{isAdmin:isAdmin}})
    }

    public async findByActive(isActive?:boolean) : Promise<CredentialEntity | null>{
        if (isNil(isActive)) {
            throw new ParamInvalide();
        }
        return await this.repo.findOne({where:{active:isActive}})
    }

    //------------------------------------------------------------
    //  CREATE
    //------------------------------------------------------------

    public async add(element:Partial<CredentialEntity>): Promise<CredentialEntity | null>{

        const verif :CredentialEntity | null = await this.findByEmail(element.email);

        if(!isNil(verif)){
            throw new ExistException();
        }
        
        const new_element: CredentialEntity = this.repo.create(element)
        this.repo.save(new_element);
        return new_element;
    }

    //------------------------------------------------------------
    //  UPDATE
    //------------------------------------------------------------

    public async update(id:string,element:UpdateDto): Promise<CredentialEntity | null>{
        if(isNil(await this.findById(id))){
            throw new NotFoundException();
        }
        await this.repo.update({id},
            {
            username:element.username,
            password:element.password,
            email:element.email,
            description:element.description,
            isAdmin:element.isAdmin,
            active:element.active,
            updated:new Date(),
            lastConnection:new Date()
            })
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