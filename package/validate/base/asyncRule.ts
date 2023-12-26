// 异步校验 需配合防抖使用
import i18next from 'i18next';
import type { RuleObject } from 'ant-design-vue/lib/form'

export type TSemiRule = RuleObject & {
  delayTime?: number
  callbackValidator: (value: any, resolve: any, reject: any) => Promise<any>
}

// 请求返回code !== 0
export const sshNameRule = (request: Promise<any>): TSemiRule => {
  return {
    message: '校验失败',
    callbackValidator: (value, resolve, reject) => {
      // @ts-ignore
      return request(value).then(res => (res.code !== 0 ? reject() : resolve(undefined))).catch(() => reject() )
    }
  }
}
