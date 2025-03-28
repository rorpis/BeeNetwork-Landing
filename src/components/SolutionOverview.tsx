
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SolutionOverview = () => {
  const { t, language } = useLanguage();
  
  const steps = [
    {
      number: "01",
      title: t('solution.step1.title'),
      description: t('solution.step1.desc')
    },
    {
      number: "02",
      title: t('solution.step2.title'),
      description: t('solution.step2.desc')
    },
    {
      number: "03",
      title: t('solution.step3.title'),
      description: t('solution.step3.desc')
    },
    {
      number: "04",
      title: t('solution.step4.title'),
      description: t('solution.step4.desc')
    }
  ];

  // These operations don't need translation since they're service names
  const operations = [
    "Billing & Revenue Cycle", 
    "Compliance & Regulatory", 
    "Staffing & HR", 
    "Real Estate & Facilities",
    "Technology & EMR", 
    "Marketing & Acquisition", 
    "Insurer Negotiations", 
    "Legal & Accounting"
  ];

  return (
    <section className="py-20" id="how-it-works" lang={language === 'en' ? 'en' : 'es'}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('solution.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('solution.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start">
                <div className="bg-accent/50 text-primary font-bold text-2xl px-4 py-2 rounded-lg mr-4">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute h-12 w-0.5 bg-gray-200 right-[-12px] top-[80px]"></div>
              )}
              {index < steps.length - 2 && (
                <div className="absolute h-0.5 w-12 md:w-16 bg-gray-200 left-[50%] top-[110%]"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-accent/20 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">{t('solution.weHandle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operations.map((item, i) => (
              <div key={i} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
