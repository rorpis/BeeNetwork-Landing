
import React from 'react';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Apply to Join",
    description: "Complete our simple application to join our network of physician-owners. We'll evaluate your practice goals and specialty alignment."
  },
  {
    number: "02",
    title: "Practice Setup",
    description: "We handle everything from location selection to regulatory compliance, staffing, and technology implementation."
  },
  {
    number: "03",
    title: "Begin Practicing",
    description: "Focus on providing exceptional patient care while we manage the day-to-day operations, billing, and administrative tasks."
  },
  {
    number: "04",
    title: "Grow & Scale",
    description: "Leverage our network's growing resources, negotiating power, and operational efficiencies to maximize your practice's potential."
  }
];

const SolutionOverview = () => {
  return (
    <section className="py-20" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Make Practice Ownership Simple
          </h2>
          <p className="text-xl text-gray-600">
            Our comprehensive operational support system removes barriers and simplifies the path to practice ownership.
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
          <h3 className="text-2xl font-semibold mb-4 text-center">We Handle Everything Else</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Billing & Revenue Cycle", 
              "Compliance & Regulatory", 
              "Staffing & HR", 
              "Real Estate & Facilities",
              "Technology & EMR", 
              "Marketing & Acquisition", 
              "Insurer Negotiations", 
              "Legal & Accounting"
            ].map((item, i) => (
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
