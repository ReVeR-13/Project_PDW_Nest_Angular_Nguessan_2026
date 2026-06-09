import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DtoOptionMessage, StatutAbri } from "home";
import { AbriUpdateDto } from "./abriUpdate.dto";
import { Type } from "class-transformer";

export class AbriReponseDto extends AbriUpdateDto {

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '12345',
        description: 'id de utilisateur',
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
    created: Date;

}