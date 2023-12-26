// // @ts-nocheck
import i18next from 'i18next';
import { formatValidators } from './base/utils'
import { COMMON_VALIDATORS } from './config';
import { Required, LengthMinMax, Phone, Email, LengthMax, NoSpacesAndChinese } from './base/index'

export const commonRule = (options) => {
  return formatValidators(...COMMON_VALIDATORS())(options)
}

export const requiredRule = (options) => {
  return formatValidators(Required())(options)
}

export const nameRule = (options) => {
  return formatValidators(Required(), LengthMinMax(2, 25))(options)
}

export const phoneRule = (options) => {
  const required = Required()
  required.message = i18next.t('noEmptyPhone')
  return formatValidators(required, Phone())(options)
}

export const emailRule = (options) => {
  return formatValidators(Required(), Email(), LengthMax(50))(options)
}

export const passwordRule = (options) => {
  return formatValidators(Required(), LengthMinMax(6, 25), NoSpacesAndChinese())(options)
}

export * from './base/validatorCreator'