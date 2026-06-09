import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { DtoOptionMessage } from "../../../common/api/data/enum/dto.message.option";

export class RefreshTokenDto {

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @MinLength(4, { message: DtoOptionMessage.LoginLenght })
    @ApiProperty({
        example: '01KR7NFZPYK7X9TQQA4V3QX5SC',
        description: 'Token Id',
        required: true
    })
    valeur: string;
}