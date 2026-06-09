import { ApiCodeResponse } from '@common/api';

export interface ApiResponse {
  code: ApiCodeResponse;
  result: boolean;
  data: any;
}
