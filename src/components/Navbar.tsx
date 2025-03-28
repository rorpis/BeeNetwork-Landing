
import React from 'react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">
            PrivateClinics<span className="text-secondary">Network</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">
            {t('nav.howItWorks')}
          </a>
          <a href="#benefits" className="text-gray-600 hover:text-primary transition-colors">
            {t('nav.benefits')}
          </a>
          <a href="#about" className="text-gray-600 hover:text-primary transition-colors">
            {t('nav.about')}
          </a>
          <LanguageSwitcher />
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="#waitlist">{t('nav.joinWaitlist')}</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
