import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { DtoOptionMessage } from "home";
import { ContactUpdateDto } from "./contact-update.dto";
import { TypeContactConnexionEntity } from "../type-contact-contact/entity/type-contact-connexion.entity";
import { DemandeEntity } from "api/demande/Entity/demande.entity";
import { Type } from "class-transformer";

export class ContactReponseDto extends ContactUpdateDto {

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '12345',
        description: 'id du contact',
        required: true
    })
    id: string;

    @Type(() => Date)
    @IsDate({ message: DtoOptionMessage.Date })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '13/11/2009',
        description: 'date de creation',
        required: true
    })
    dateCreation: Date;

    @ApiProperty({
        example: '--',
        description: 'les roles',
        required: false
    })
    roles: TypeContactConnexionEntity[];

    @ApiProperty({
        example: '--',
        description: 'les demandes',
        required: false
    })
    demande:DemandeEntity[];   

}