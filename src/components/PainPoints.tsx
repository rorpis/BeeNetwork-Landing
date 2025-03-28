
import React from 'react';
import { Clock, DollarSign, FileText, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PainPoints = () => {
  const { t, language } = useLanguage();
  
  const painPoints = [
    {
      icon: <FileText className="h-8 w-8 text-red-500" />,
      title: t('painPoints.operations.title'),
      description: t('painPoints.operations.desc')
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: t('painPoints.profitability.title'),
      description: t('painPoints.profitability.desc')
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
      title: t('painPoints.negotiation.title'),
      description: t('painPoints.negotiation.desc')
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: t('painPoints.admin.title'),
      description: t('painPoints.admin.desc')
    }
  ];

  return (
    <section className="py-20 bg-muted" id="pain-points" lang={language === 'en' ? 'en' : 'es'}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('painPoints.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('painPoints.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
