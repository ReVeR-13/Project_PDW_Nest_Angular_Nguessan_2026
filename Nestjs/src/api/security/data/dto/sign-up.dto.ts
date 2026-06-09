import { IsNotEmpty, IsString, Length } from "class-validator";
import { SignInDto } from "./sign-in.dto";
import { DtoOptionMessage } from "../../../common/api/data/enum/dto.message.option";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto extends SignInDto{

    @IsString({message: DtoOptionMessage.String})
    @IsNotEmpty({ message: DtoOptionMessage.NotEmpty })
    @Length(2,25,{message: DtoOptionMessage.LoginLenght})
    @ApiProperty({
        example: 'bill',
        description: 'login de utilisateur',
        required:true
    })
    username: string;

    @IsString({message:DtoOptionMessage.String})
    @ApiProperty({
        example:`descrition de l'utilisateur ...`,
        description :'descrition de utilisateur',
        required:false
    })
    description : string;
}