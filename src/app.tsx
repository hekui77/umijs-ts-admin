import { RequestConfig } from 'umi';
import { getToken } from '@/utils/auth';
import { history } from 'umi';

// 请求配置
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
  requestInterceptors: [
    (url, options) => ({
      url,
      options: {
        ...options,
        headers: {
          authorization: 'Bearer ' + getToken()
        }
      }
    })
  ],
  responseInterceptors: [],
};

// 覆写 render 渲染之前登录校验
export function render(oldRender: () => void) {  
  if (getToken()) { oldRender() }
  else { 
    history.push('/login'); 
    oldRender()
  }
}