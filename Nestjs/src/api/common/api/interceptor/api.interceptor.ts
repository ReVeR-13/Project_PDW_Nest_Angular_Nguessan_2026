import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ApiCodeResponse } from "../../api";
import { ConfigKey, configManager } from "../../config";
import { isNil } from "lodash";
import { map, Observable } from "rxjs";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class ApiInterceptor implements NestInterceptor{

    private readonly logger = new Logger(ApiInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const ctx:HttpArgumentsHost = context.switchToHttp();
        const path = ctx.getRequest().route.path;
        return next
            .handle()
            .pipe(
                map((res:any)=>{
                    return {code:this.map(path),data:instanceToPlain(res), result:true}
                })
            );
    }

    map(path: string) :ApiCodeResponse{
        
        this.logger.log(`path: ${path}`);

        const part = path
        .replace(configManager.getValue(ConfigKey.APP_BASE_URL),"")
        .split('/')
        .filter(s=>s.length > 0)
        .slice(0,2)
        .map(s=> s.toUpperCase());

        const code:ApiCodeResponse = ApiCodeResponse[`${part.join('_')}_SUCCESS` as keyof typeof ApiCodeResponse];
        return isNil(code)? ApiCodeResponse.Common_success :code;
    }
    
}