
import React from 'react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { t } = useLanguage();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-honey shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/d279ab32-44e0-473f-bc4b-f419642be4d8.png" 
              alt="TheBeeNetwork Logo" 
              className="h-10 w-auto"
            />
          </Link>
          <h1 className="text-xl font-semibold">
            <span className="text-primary">The<span className="font-bold">Bee</span></span>
            <span className="text-secondary">Network</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/why-independence" className="text-gray-700 hover:text-primary transition-colors">
            Why Independence
          </Link>
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
