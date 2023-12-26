import i18next from 'i18next';
import translationEN from './en_US.json';
import translationZH from './zh_ZN.json';

// 初始化i18next
i18next.init({
  lng: 'zh-CN', // 设置默认语言
  resources: {
    "en-GB": {
      translation: translationEN, // 加载英语翻译
    },
    "zh-CN": {
      translation: translationZH, // 加载中文翻译
    },
  },
});

export default i18next
