import { computed } from 'vue'
// import i18next from 'i18next';
import type { Ref } from 'vue'
import { formatValidators } from './base/utils'
import { Required, LengthMinMax, NoSpacesAndChinese, MatchTargetValue } from './base/index'

// export function useRepeatPasswordRules(target: Ref<string> | UnwrapNestedRefs<any>) {
//   const rules = computed(() => {
//     return [
//       requiredRule(i18next.t('password')),
//       lengthMinMax(6, 25)(i18next.t('password')),
//       noSpacesAndChinese(),
//       createMatchTargetValueRule(target.value)
//     ]
//   })
//   return rules
// }
export function useRepeatPasswordRules(target: Ref<string>) {
  return computed(() => {
    return formatValidators(
      Required(),
      LengthMinMax(6, 25),
      NoSpacesAndChinese,
      MatchTargetValue(target.value)
    )()
  })
}