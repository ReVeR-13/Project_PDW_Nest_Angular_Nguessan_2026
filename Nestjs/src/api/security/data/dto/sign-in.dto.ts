import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MinLength, minLength } from "class-validator";
import { DtoOptionMessage } from "../../../common/api/data/enum/dto.message.option";

export class SignInDto {

    @IsEmail({blacklisted_chars:DtoOptionMessage.Blacklist},
            { message:DtoOptionMessage.Invalide}
            )
    @IsNotEmpty({message:DtoOptionMessage.NotEmpty})
    @ApiProperty({
        example:'bobi@hotmail.be',
        description :'email de utilisateur',
        required:true
    })
    email : string;


    @IsNotEmpty({message: DtoOptionMessage.NotEmpty})
    @Length(5,30,{message: DtoOptionMessage.PassLenght})
    @ApiProperty({
        example: '*********',
        description: 'Mot de passe de utilisateur',
        required:true
    })
    password: string;
}