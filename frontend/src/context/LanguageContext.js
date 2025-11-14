import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    changeLanguage(savedLang);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setT(translations[lang] || translations.en);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    t,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;