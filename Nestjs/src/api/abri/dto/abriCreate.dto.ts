import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DtoOptionMessage } from "../../common/api/data/enum";

export class AbriCreateDto{

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'A13',
        description: `nom de designation de l'abri `,
        required: true
    })
    nom: string;

    @IsOptional({message:DtoOptionMessage.IsOptional})
    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({

        example: 'aquarium à reptils...',
        description: 'description de l abri',
        required: false

    })
    description: string;

}