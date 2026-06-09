import { DtoOptionMessage } from "../../../common/api/data/enum/dto.message.option";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { SignUpDto } from "./sign-up.dto";
import { Exclude } from "class-transformer";

export class CredentialDto extends SignUpDto{

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '12345',
        description: 'id de utilisateur',
        required: true
    })
    id: string;

    @IsDate({ message: DtoOptionMessage.Date })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '13/11/2009',
        description: 'date de creation',
        required: true
    })
    created: Date;

    @IsDate({ message: DtoOptionMessage.Date })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: '13/11/2009',
        description: 'date de modification',
        required: true
    })
    updated: Date;

    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'token...',
        description: 'token',
        required: true
    })
    token: string;

    @Exclude({toPlainOnly:true})
    @IsString({ message: DtoOptionMessage.String })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: 'refreshtoken...',
        description: 'refresh token',
        required: true
    })
    refreshToken: string;

}