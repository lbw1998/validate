import type { RuleObject } from 'ant-design-vue/lib/form'
import type { TSemiRule } from './asyncRule'
import { CREATE_VALIDATOR_MENU, COMMON_VALIDATORS, DEFAULT_COMPILER } from '../config/index'

// export function createDebounceSshNameRule(semiRule: TSemiRule): RuleObject {
//   const { message, callbackValidator, delayTime = 500 } = semiRule
//   let timeId: any = null
//   return {
//     message,
//     validator(_rule, value) {
//       return new Promise((resolve, reject) => {
//         clearTimeout(timeId)
//         timeId = setTimeout(() => {
//           callbackValidator(value, resolve, reject)
//         }, delayTime)
//       })
//     }
//   }
// }

export const createValidator = CREATE_VALIDATOR_MENU[DEFAULT_COMPILER]

export function formatValidators (...validators) {
  return (options?) => {
    if (options?.validator) {
      const { validator, ...newOptions } = options
      return [{ validator:  createValidator(...COMMON_VALIDATORS(), validator, ...validators), ...newOptions}]
    }
    return [{ validator:  createValidator(...COMMON_VALIDATORS(), ...validators), ...options}]
  }
}
