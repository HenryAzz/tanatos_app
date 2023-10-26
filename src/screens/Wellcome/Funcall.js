import {useTranslation} from 'react-i18next';

const {t, i18n} = useTranslation();

export const toggleLanguage = async () => {
  if (i18n.language === 'en') {
    await AsyncStorage.setItem('user-language', 'es');
    i18n.changeLanguage('es'); // Switch to Spanish
  } else {
    await AsyncStorage.setItem('user-language', 'en');
    i18n.changeLanguage('en'); // Switch to English
  }
};
