import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('trinord-language') || 'en')
  useEffect(() => {
    localStorage.setItem('trinord-language', language)
    document.documentElement.lang = language
  }, [language])
  const value = useMemo(() => ({ language, setLanguage }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() { return useContext(LanguageContext) }
