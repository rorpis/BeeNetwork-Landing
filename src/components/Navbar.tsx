
import React from 'react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-honey shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/135fb281-b4be-4724-a328-1dc39f73654a.png" 
            alt="TheBeeNetwork Logo" 
            className="h-10 w-auto"
          />
          <h1 className="text-xl font-semibold">
            <span className="text-primary">The<span className="font-bold">Bee</span></span>
            <span className="text-secondary">Network</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">
            {t('nav.howItWorks')}
          </a>
          <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">
            {t('nav.benefits')}
          </a>
          <a href="#about" className="text-gray-700 hover:text-primary transition-colors">
            {t('nav.about')}
          </a>
          <LanguageSwitcher />
        </div>
        <Button asChild className="bg-secondary hover:bg-secondary-hover text-white">
          <a href="#waitlist">{t('nav.joinWaitlist')}</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
