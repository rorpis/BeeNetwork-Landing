
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12" lang={language === 'en' ? 'en' : 'es'}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-primary mb-4">
              PrivateClinics<span className="text-secondary">Network</span>
            </h3>
            <p className="text-gray-600 max-w-md">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">{t('nav.howItWorks')}</a></li>
              <li><a href="#benefits" className="text-gray-600 hover:text-primary transition-colors">{t('nav.benefits')}</a></li>
              <li><a href="#waitlist" className="text-gray-600 hover:text-primary transition-colors">{t('nav.joinWaitlist')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2">
              <li><a href="mailto:info@privateclinicsnetwork.com" className="text-gray-600 hover:text-primary transition-colors">info@privateclinicsnetwork.com</a></li>
              <li className="text-gray-600">(555) 123-4567</li>
              <li><LanguageSwitcher /></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PrivateClinicsNetwork. {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
