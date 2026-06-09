import { Injectable } from '@nestjs/common';
import { Abri } from './Abri';
import { DataG } from '../../../lesBases/DB_stock';
import { AbriRepository } from './repository/abri.repository';
import { AbriReponseDto } from './dto/abriReponse.dto';
import { isNil } from 'lodash';
import { CreationFailException, ExistException, NotExistException, UpdateFailException } from 'home';
import { AbriCreateDto } from './dto/abriCreate.dto';
import { AbriEntity } from './entity/abri.entity';
import { AbriUpdateDto } from './dto/abriUpdate.dto';

@Injectable()
export class AbriService {

    private t_abri: Abri[] = DataG.t_abri;

    constructor(private readonly abriRepository: AbriRepository) { }

    async FindAll(): Promise<Partial<AbriReponseDto>[]> {

        if (Object.keys(this.t_abri).length === 0) {
            this.t_abri = [
                ...(await this.abriRepository.findAll()).map((a) => Abri.entityToMetier(a))
            ]
        }
        return this.t_abri;
    }

    async FindById(id: string): Promise<null | Partial<AbriReponseDto>> {

        let abri: Abri | undefined = this.t_abri.find((e) => e.id === id);

        if (isNil(abri)) {
            const retval = await this.abriRepository.findById(id);
            if (isNil(retval)) {
                throw new NotExistException();
            }

            abri = Abri.entityToMetier(retval);
            this.t_abri.push(abri);
        }

        return abri ?? null;
    }

    async FindByLibele(libele: string): Promise<null | Partial<AbriReponseDto>> {

        let abri: Abri | undefined = this.t_abri.find((e) => e.libele === libele);

        if (isNil(abri)) {
            const retval = await this.abriRepository.findBynom(libele);
            if (isNil(retval)) {
                throw new NotExistException();
            }
            abri = Abri.entityToMetier(retval);
            this.t_abri.push(abri);
        }

        return abri ?? null;
    }

    async Create(abri: AbriCreateDto): Promise<null | Partial<AbriReponseDto>> {

        abri.nom = abri.nom.toUpperCase();

        if (await this.abriRepository.findBynom(abri.nom) !== null) {
            throw new ExistException();
        }

        const newabri: Abri | undefined = Abri.Creer(abri.nom, abri.description);
        if (isNil(newabri)) {
            throw new CreationFailException();
        }

        const abriEntity: AbriEntity | null = await this.abriRepository.add(newabri.entity());
        if (isNil(abriEntity)) {
            throw new CreationFailException();
        }

        this.t_abri.push(newabri)
        return abriEntity;
    }

    async Modifier(id: string, abri: AbriUpdateDto): Promise<null | Partial<AbriReponseDto>> {

        const newElement: AbriEntity | null = await this.abriRepository.update(id, abri);
        if (isNil(newElement)) {
            throw new UpdateFailException();
        }

        let idx: Abri | undefined = this.t_abri.find((a) => a.id === newElement?.id);

        if (isNil(idx)) {
            idx = Abri.entityToMetier(newElement);
            this.t_abri.push(idx);
        }
        
        idx.Modifier(abri.nom,abri.description,abri.statut)

        return idx;

    }

    async Supprimer(id: string): Promise<string> {
        let retval = 'Suppression annulée';

        const st: number = await this.abriRepository.delete(id);
        if (st !== 0) {
            const idx: number = this.t_abri.findIndex((a) => a.id === id.padStart(2, '0'));
            if (this.t_abri[idx]) {
                this.t_abri.splice(idx, 1);
                retval = `Suppression effectué`;
            }
        }

        return retval;
    }
}
