
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" lang={language === 'en' ? 'en' : 'es'}>
      {/* Background element */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-accent/30 rounded-bl-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              {t('hero.title').split(',')[0]}, <span className="text-primary">{t('hero.title').split(',')[1]}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                <a href="#waitlist" className="flex items-center">
                  {t('hero.joinWaitlist')} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">
                  {t('hero.learnHow')}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop"
              alt="Physician in modern medical practice"
              className="rounded-2xl shadow-xl max-h-[500px] object-cover"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">MD</div>
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">DO</div>
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">NP</div>
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
