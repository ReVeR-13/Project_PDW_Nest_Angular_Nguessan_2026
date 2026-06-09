import { ApiCodeResponse } from "../enum";


export interface ApiResponseModel{
    code:ApiCodeResponse | string,
    data:any|null,
    result:boolean,
    paramError:boolean
}