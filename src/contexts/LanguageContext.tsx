import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'gd' | 'ga';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') as Language;
    return lang === 'gd' ? 'gd' : 'ga';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('lang', language);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 