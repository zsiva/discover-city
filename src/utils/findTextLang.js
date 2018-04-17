import { TEXTS } from '../data/texts.js';


  function findLanguage(array, language) {
    return array.find((element) => {
      return element.language === language;
    })
    }
  function findText(array, text) {
    return array.find((element) => {
      return element.label === text;
    })
    }

  function findTextLang(language, text) {
    var temp = findLanguage(TEXTS,language);
    var result = findText(temp.texts,text);
    return result.text
  }

export { findTextLang };
