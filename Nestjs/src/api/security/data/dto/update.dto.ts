import { Injectable } from "@nestjs/common";
import { SignUpDto } from "./sign-up.dto";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { DtoOptionMessage } from "../../../common/api/data/enum/dto.message.option";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class UpdateDto extends SignUpDto {

    @IsBoolean({ message: DtoOptionMessage.Bool })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: false,
        description: 'Cet utilisateur, est-il administrateur?',
        required: true
    })
    isAdmin: boolean;

    @IsBoolean({ message: DtoOptionMessage.Bool })
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @ApiProperty({
        example: false,
        description: 'Ce compte, est-il actif ?',
        required: true
    })
    active: boolean;
}