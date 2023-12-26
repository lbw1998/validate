import i18n from './i18n/index'
import * as rules from './validate/rules'
import { setCompiler } from './validate/config/constant'
import { createValidator, formatValidators } from './validate/base/utils'
import * as baseRules from './validate/base/validatorCreator'
// export * from './validate/rulesHooks'

export { i18n, rules, baseRules, setCompiler, createValidator, formatValidators }
export default { i18n, rules, baseRules, setCompiler, createValidator, formatValidators }
