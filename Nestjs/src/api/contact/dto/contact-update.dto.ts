
import { DtoOptionMessage } from "home";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class ContactUpdateDto {
    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'bill',
        description: 'nom du contact',
        required: true
    })
    nom: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'bill',
        description: 'prenom du contact',
        required: true
    })
    prenom: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '12345678909',
        description: 'niss du contact',
        required: true
    })
    niss: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '1234567890',
        description: 'numero de gsm',
        required: true
    })
    gsm: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '1234567890',
        description: 'numero de telephone',
        required: true
    })
    telephone: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'example@gmail.be',
        description: 'email',
        required: true
    })
    mail: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '1000',
        description: 'code podtal',
        required: false
    })
    codePostale: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'Brussels',
        description: 'ville/localité',
        required: false
    })
    localite: string;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'Rue du pont 23',
        description: 'adresse',
        required: false
    })
    rue: string;

    @Type(() => Date)
    @IsDate({ message: `la date de naissance dois etre une date` })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '13/11/2009',
        description: 'date de naissance',
        required: false
    })
    dateNaissance: Date;

}