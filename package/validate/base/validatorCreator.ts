// 存放自定义操作规则
import i18next from 'i18next';
import emojiRegex from 'emoji-regex'
import type { Ref } from 'vue';

// 必填的
export const Required = () => {
  return {
    message: i18next.t('noEmpty'),
    validator(value) {
      return value.trim() ===''
    }
  }
}

// 判断emoji
export const NoEmoji = () => {
  return {
    message: i18next.t('noEmoji'),
    validator(value) {
      const regex = emojiRegex()
      return regex.exec(value)
    }
  }
}

// 不包含空格
export const NoSpaces = () => {
  return {
    message: i18next.t('noSpaces'),
    validator(value) {
      return !/^[^\s]*$/.test(value)
    }
  }
}

// 手机号
export const Phone = () => {
  return {
    message: i18next.t('validPhone'),
    validator(value) {
      return !/^1[3-9]\d{9}$/.test(value)
    }
  }
}

// 邮箱
export const Email = () => {
  return {
    message: i18next.t('validEmail'),
    validator(value) {
      return !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value)
    }
  }
}

// 验证码
export const Code = () => {
  return {
    message: i18next.t('validCode'),
    validator(value) {
      return /^\d{6}$/.test(value)
    }
  }
}

// 密码(不包含空格和中文字符)
export const NoSpacesAndChinese = () => {
  return {
    message: i18next.t('noSpacesAndChinese'),
    validator(value) {
      return !/^[^\s\u4e00-\u9fa5]*$/.test(value)
    }
  }
}

// 字母+数字
export const LettersAndNumbers = () => {
  return {
    message: i18next.t('lettersAndNumbers'),
    validator(value) {
      return /^[0-9a-zA-Z]+$/.test(value)
    }
  }
}


// 长度为 min ~ max 字符
export const LengthMinMax = (min = 0, max = 99) => {
  return {
    message: () => i18next.t('lengthMinMax', { min, max }),
    validator(value) {
      return !new RegExp(`^.{${min},${max}}$`).test(value)
    }
  }
}


// 长度不能超过 max 字符
export const LengthMax = (max = 99) => {
  return {
    message: () => i18next.t('lengthMax', { max }),
    validator(value) {
      return !new RegExp(`^(.{1,${max}})$`).test(value)
    }
  }
}

// 长度不能小于 min 字符
export const LengthMin = (min = 0) => {
  return {
    message: () => i18next.t('lengthMin', { min }),
    validator(value) {
      return !new RegExp(`^(.{${min},})$`).test(value)
    }
  }
}


// 校验是否与目标值匹配
export const MatchTargetValue = (targetValue) => {
  // targetValue: Ref<string> 
  return {
    message: i18next.t('noEqual'),
    validator(value) {
      return value !== targetValue
    }
  }
}