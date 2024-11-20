/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-28 16:06:48
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-29 13:31:59
 * @FilePath: \cme\src\plugins\i18n\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createI18n } from 'vue-i18n'
import * as zh from './zh.js'
import * as en from './en.js'

const DEFAULT_LANG = "chn"
const LOCALE_KEY = 'localeLanguage'

const locales = {
  chn: zh,
  en: en,
}

const i18n = createI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)



  // Vue.config.lang = lang
  i18n.locale = lang
}

setup()
export default i18n