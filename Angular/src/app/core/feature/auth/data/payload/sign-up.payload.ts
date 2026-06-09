import { SignInPayload } from "./sign-in.payload";

export interface SignUpPayload extends SignInPayload{
    username:string;
    description:string;
    condition : boolean;
}