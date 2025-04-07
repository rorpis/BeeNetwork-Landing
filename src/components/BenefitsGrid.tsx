
import React from 'react';
import { DollarSign, Clock, Award, Shield, Lightbulb, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BenefitsGrid = () => {
  const { t, language } = useLanguage();
  
  const benefits = [
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: t('benefits.income.title'),
      description: t('benefits.income.desc')
    },
    {
      icon: <Briefcase className="h-10 w-10 text-secondary" />,
      title: t('benefits.autonomy.title'),
      description: t('benefits.autonomy.desc')
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: t('benefits.launch.title'),
      description: t('benefits.launch.desc')
    },
    {
      icon: <Shield className="h-10 w-10 text-secondary" />,
      title: t('benefits.risk.title'),
      description: t('benefits.risk.desc')
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: t('benefits.network.title'),
      description: t('benefits.network.desc')
    },
    {
      icon: <Award className="h-10 w-10 text-secondary" />,
      title: t('benefits.legacy.title'),
      description: t('benefits.legacy.desc')
    }
  ];

  return (
    <section className="py-20 bg-white" id="benefits" lang={language === 'en' ? 'en' : 'es'}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6 flex justify-center">
            <img 
              src="/lovable-uploads/d279ab32-44e0-473f-bc4b-f419642be4d8.png" 
              alt="TheBeeNetwork Logo" 
              className="h-20 w-auto animate-bee-fly"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-gray-700">
            {t('benefits.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white border border-primary/20 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 bg-honey inline-flex p-3 rounded-lg">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
