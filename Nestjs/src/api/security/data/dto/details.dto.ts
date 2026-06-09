import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { DtoOptionMessage } from "home";

export class DetailsDto {

    @ApiProperty({
        example: '01KR7NFZPYK7X9TQQA4V3QX5SC',
        description: 'Id de utilisateur',
        required: true
    })
    id: string;
}