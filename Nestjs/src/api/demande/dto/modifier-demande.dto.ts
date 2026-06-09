
import { IsDate } from "class-validator";
import { CreateDemandeDto } from "./create-demande.dto";
import { Type } from "class-transformer";


export class ModifierDemandeDto extends CreateDemandeDto {
    @Type(() => Date)
    @IsDate()
    dateFermerture: Date;
}