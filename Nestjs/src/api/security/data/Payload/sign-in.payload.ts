import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignInPayload{

    @ApiProperty({example:'abc.efd@abc.abc'})
    @IsEmail()
    email:string;

    @ApiProperty({
        example:'password'
    })
    password:string;
}