import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { DtoOptionMessage } from "../../common/api/data/enum";

export class CreateCouleurDto {

    @IsString({message: DtoOptionMessage.String})
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @Length(2,50,{message: DtoOptionMessage.LoginLenght})
    @ApiProperty({
        example: 'Bleu',
        description: 'nom de la couleur',
        required:true
    })
    nom: string;

}