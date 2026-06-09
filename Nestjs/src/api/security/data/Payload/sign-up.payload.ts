import { ApiProperty } from "@nestjs/swagger";
import { SignInPayload } from "./sign-in.payload";
import { IsEmail } from "class-validator";

export class SignUpPayload extends SignInPayload{

    @ApiProperty({example:'username'})
    username:string;

    @ApiProperty({example:'description..'})
    description:string;

}