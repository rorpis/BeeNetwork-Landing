
import React from 'react';
import { DollarSign, Clock, Award, Shield, Lightbulb, Briefcase } from 'lucide-react';

const benefits = [
  {
    icon: <DollarSign className="h-10 w-10 text-primary" />,
    title: "50-80% Higher Income",
    description: "Earn significantly more than traditional employment while retaining the security of our operational support."
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Full Clinical Autonomy",
    description: "Practice medicine your way, with complete freedom over clinical decision-making and patient care approach."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Rapid Launch",
    description: "Get your practice up and running in a fraction of the time it would take independently - often in just 90 days."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Reduced Risk",
    description: "Our operational expertise minimizes financial, regulatory, and administrative risks of practice ownership."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Network Advantages",
    description: "Benefit from shared resources, collective negotiating power, and knowledge exchange with peer physicians."
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Legacy Building",
    description: "Create a valuable, sustainable practice asset that can be scaled or transferred in the future."
  }
];

const BenefitsGrid = () => {
  return (
    <section className="py-20 bg-white" id="benefits">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Benefits of Joining Our Network
          </h2>
          <p className="text-xl text-gray-600">
            Experience the freedom of ownership with the support of an established network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 bg-accent/30 inline-flex p-3 rounded-lg">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
