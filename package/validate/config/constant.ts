// // 是否是异步函数
// function isAsyncValidator(validator) {
//   return typeof validator === 'function' && Object.prototype.toString.call(validator) === '[object AsyncFunction]';
// }

import { NoEmoji } from "../base";


export let DEFAULT_COMPILER = 'ANTD'

export const setCompiler  = (value) => {
  DEFAULT_COMPILER = value
}

export const COMMON_VALIDATORS = () => {
  return [NoEmoji()]
}

// 根据组件库整合validators
export const CREATE_VALIDATOR_MENU = {
  ELE: (...validators) => {
    return (_rule, value, callback) => {
      for (const validator of validators) {
        if (validator.validator(value)) {
          const message = typeof validator.message === 'function' ? validator.message() : validator.message
          return callback(new Error(message))
        }
      }
      return callback()
    }
  },
  ANTD: (...validators) => {
    return (_rule, value) => {
      for (const validator of validators) {
        if (validator.validator(value)) {
          const message = typeof validator.message === 'function' ? validator.message() : validator.message
          return Promise.reject(message)
        }
      }
      return Promise.resolve()
    }
  }
}