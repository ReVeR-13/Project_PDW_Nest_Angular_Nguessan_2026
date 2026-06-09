// [app.exception.ts] app.exception.ts
import { ApiCodeResponse,ApiException } from "@common/api";

export class TestException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Test,200);
    }
}

export class ExistException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Existe,400);
    }
}

export class NotExistException extends ApiException {
    constructor(){
        super(ApiCodeResponse.NotExiste,400);
    }
}

export class UserNotFoundException extends ApiException {
    constructor(){
        super(ApiCodeResponse.UserNotFound,400);
    }
}
export class TokenNotFoundException extends ApiException {
    constructor(){
        super(ApiCodeResponse.TokenNotFound,400);
    }
}
export class TokenExpiredException extends ApiException {
    constructor(){
        super(ApiCodeResponse.TokenExpired,400);
    }
}
export class NotFoundException extends ApiException {
    constructor(){
        super(ApiCodeResponse.NotFound,400);
    }
}

export class ParamInvalide extends ApiException {
    constructor(){
        super(ApiCodeResponse.ParametreErreur,400);
    }
}

export class NullException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Null,400);
    }
}

export class TokenGenerationException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Token_Generation_fail,400);
    }
}

export class CreationFailException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Creation_fail,400);
    }
}

export class UpdateFailException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Update_fail,400);
    }
}

export class DeleteFailException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Delete_fail,400);
    }
}

export class BadGuardAccessException extends ApiException {
    constructor(){
        super(ApiCodeResponse.Bad_Guard_Access,400);
    }
}