import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DtoOptionMessage } from '../../common/api/data/enum';
import { AbriCreateDto } from "./abriCreate.dto";
import { StatutAbri } from "home";

export class AbriUpdateDto extends AbriCreateDto{

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @IsOptional({ message: DtoOptionMessage.IsOptional })
    @IsEnum({enum: StatutAbri,default:'HORS_SERVICE'})
    @ApiProperty({
        example: 'HORS_SERVICE',
        description: `Statut de l'abri `,
        required: true
    })
    statut: StatutAbri;

}