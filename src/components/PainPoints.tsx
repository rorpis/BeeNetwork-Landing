
import React from 'react';
import { Clock, DollarSign, FileText, AlertTriangle, Users } from 'lucide-react';

const painPoints = [
  {
    icon: <FileText className="h-8 w-8 text-red-500" />,
    title: "Complex Operations",
    description: "Starting a practice involves overwhelming operational requirements, regulatory compliance, and administrative burden."
  },
  {
    icon: <Clock className="h-8 w-8 text-orange-500" />,
    title: "Time to Profitability",
    description: "Traditional practice models can take years to reach sustainable profitability, creating financial uncertainty."
  },
  {
    icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
    title: "Limited Negotiation Power",
    description: "Individual practices lack bargaining power with insurers, resulting in suboptimal reimbursement rates."
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
    title: "Administrative Overhead",
    description: "Managing compliance, billing, staffing, and technology takes time away from providing patient care."
  }
];

const PainPoints = () => {
  return (
    <section className="py-20 bg-muted" id="pain-points">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Practice Ownership Feels Out of Reach
          </h2>
          <p className="text-xl text-gray-600">
            Most physicians want the autonomy and income potential of owning a practice, but face significant barriers:
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
