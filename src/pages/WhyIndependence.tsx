
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyIndependence = () => {
  const { t, language } = useLanguage();
  
  const benefits = [
    "Increased income potential - earn 30-50% more than employed physicians",
    "Complete clinical autonomy and decision-making power",
    "Build equity in your own practice without corporate interference",
    "Flexible scheduling that fits your lifestyle",
    "Direct patient relationships without corporate barriers",
    "Legacy building opportunity for long-term professional satisfaction"
  ];
  
  const challenges = [
    "Administrative burden handled by our dedicated team",
    "Regulatory compliance managed by our specialists",
    "Billing and revenue cycle optimization",
    "Reduced startup costs through our shared services model",
    "Marketing and patient acquisition support",
    "Insurance negotiations and credentialing assistance"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-20 bg-honey" lang={language === 'en' ? 'en' : 'es'}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Why Independent Practice is <span className="text-primary">Better for Physicians</span>
              </h1>
              <p className="text-xl mb-8">
                Discover how physician ownership puts you back in control of your professional life without the typical administrative burden.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-hover text-white px-8">
                <a href="/#waitlist" className="flex items-center">
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-accent/10 p-8 rounded-xl text-center">
                <div className="text-primary text-4xl font-bold mb-2">87%</div>
                <p className="text-lg">of independent physicians report higher professional satisfaction</p>
              </div>
              <div className="bg-accent/10 p-8 rounded-xl text-center">
                <div className="text-primary text-4xl font-bold mb-2">30-50%</div>
                <p className="text-lg">average increase in physician income compared to employment</p>
              </div>
              <div className="bg-accent/10 p-8 rounded-xl text-center">
                <div className="text-primary text-4xl font-bold mb-2">91%</div>
                <p className="text-lg">of independent physicians would choose the same path again</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits and challenges sections */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Benefits of Independence</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Challenges We Solve</h2>
                <ul className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-secondary mr-2 flex-shrink-0 mt-1" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Physician testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">What Physicians Say About Independence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <p className="italic mb-4">"Transitioning to my own practice was the best career decision I've made. I have more time with patients, better income, and finally enjoy medicine again."</p>
                <div className="font-semibold">Dr. Sarah Johnson</div>
                <div className="text-sm text-gray-600">Family Medicine, Independent since 2021</div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <p className="italic mb-4">"I was afraid of the business side of running a practice, but with TheBeeNetwork's support, it's been seamless. I focus on patients while they handle operations."</p>
                <div className="font-semibold">Dr. Michael Chen</div>
                <div className="text-sm text-gray-600">Internal Medicine, Independent since 2022</div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <p className="italic mb-4">"My income increased by 40% in the first year of independent practice. More importantly, I regained control over how I practice medicine."</p>
                <div className="font-semibold">Dr. Rebecca Torres</div>
                <div className="text-sm text-gray-600">Pediatrics, Independent since 2020</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Medical Career?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our network of independent physicians who are practicing medicine on their own terms without the administrative burden.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-hover text-white px-8">
              <a href="/#waitlist" className="flex items-center">
                Join Our Physician Network <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WhyIndependence;
