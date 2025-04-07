
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" lang={language === 'en' ? 'en' : 'es'}>
      {/* Background element */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-primary/10 rounded-bl-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="mb-6 inline-flex">
              <div className="relative">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <img 
                    src="/lovable-uploads/135fb281-b4be-4724-a328-1dc39f73654a.png" 
                    alt="TheBeeNetwork" 
                    className="h-16 w-auto animate-float"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-honey p-1.5 rounded-full border-2 border-primary">
                  <div className="w-4 h-4 rounded-full bg-nature"></div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              {t('hero.title').split(',')[0]}, <span className="text-primary">{t('hero.title').split(',')[1]}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-hover text-white px-8">
                <a href="#waitlist" className="flex items-center">
                  {t('hero.joinWaitlist')} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <a href="#how-it-works">
                  {t('hero.learnHow')}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in flex justify-center items-center">
            <img
              src="/lovable-uploads/42d3d8c9-6444-4cad-9311-64895dfdd19c.png"
              alt="Physician in modern medical practice"
              className="rounded-2xl shadow-xl max-h-[500px] object-cover"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">MD</div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-medium">DO</div>
                  <div className="w-10 h-10 rounded-full bg-nature flex items-center justify-center text-white font-medium">NP</div>
                </div>
                <p className="text-sm font-medium">
                  {t('hero.joinedWaitlist')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
