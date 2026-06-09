import { Injectable } from '@nestjs/common';
import { DataG } from '../../../lesBases/DB_stock';
import { Couleur } from './Couleur';
import { CouleurRepository } from './repository/couleur.repository';
import { CreateCouleurDto } from './dto/create.dto';

@Injectable()
export class CouleurService {

    private dataJson: Couleur[] = DataG.t_couleur;

    constructor(private readonly repository: CouleurRepository) { }

    public async FindAll(): Promise<Couleur[]> {
        let rep = await this.repository.findAll();
        for (let a in rep) {
            console.log(a, rep[a]);
        }
        return this.dataJson;
    }

    public FindById(id: string): Couleur | string {
        let retval: Couleur | string = `Cette couleur [${id.toUpperCase().trim()}] n'existe pas`;
        for (const n in this.dataJson) {

            const element: Couleur = this.dataJson[n] as Couleur;
            if (id.toUpperCase().trim() === element.id.toUpperCase()) {
                retval = element
            }

        }
        return retval;
    }

    public FindByNom(nom: CreateCouleurDto): Couleur | string {
        let retval: Couleur | string = `Cette couleur [${nom.nom.toUpperCase().trim()}] n'existe pas`;
        for (const n in this.dataJson) {

            const element: Couleur = this.dataJson[n] as Couleur;
            if (nom.nom.toUpperCase().trim() === element.id.toUpperCase()) {
                retval = element
            }

        }
        return retval;
    }

    public Creer(couleur: CreateCouleurDto): Couleur | string {
        const newanimal: Couleur | undefined = Couleur.create(couleur.nom);

        if (newanimal !== undefined) {
            this.dataJson.push(newanimal);
        }

        return newanimal ? newanimal : 'no animal made';
    }

    public Modifier(id: string, couleur: CreateCouleurDto): Couleur {
        const idx: number = this.dataJson.findIndex((a) => a.id === id);
        this.dataJson[idx].modifier(couleur.nom);
        return this.dataJson[idx];
    }

    public Supprimer(id: string): string {
        let retval = 'Suppression annulée';
        const idx: number = this.dataJson.findIndex((a) => a.id === id.toUpperCase().trim());
        if (this.dataJson[idx]) {
            this.dataJson.splice(idx, 1);
            retval = `Suppression effectué`;
        }
        return retval;
    }

}
