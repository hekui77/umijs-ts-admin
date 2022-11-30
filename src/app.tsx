import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  prefix: 'http://116.62.64.16:7003',
  timeout: 3000,
  errorConfig: {
    adaptor: data => ({
      ...data,
      success: data.status === 200,
      errorCode: data.status,
      errorMessage: data.msg,
    })
  },
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};