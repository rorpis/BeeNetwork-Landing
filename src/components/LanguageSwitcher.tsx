
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
