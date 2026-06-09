import { HttpException, ValidationError } from '@nestjs/common';
import { ApiCodeResponse } from '@common/api';

export class ApiException extends HttpException {
  constructor(code: ApiCodeResponse, status: number) {
    super({ 
      code: code, 
      data: null, 
      result: false 
    }, status);
  }
}

export class ValidationException extends HttpException {
  constructor(errors:ValidationError[]) {
    super({ 
      code: ApiCodeResponse.payload_not_valid, 
      data: errors, 
      result: false 
    }, 499);
  }
}