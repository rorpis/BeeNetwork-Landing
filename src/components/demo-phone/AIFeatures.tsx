import React from 'react';

const tagData = [
  { label: 'Credentialing', delay: '0.5s', xOffset: '-24px' },
  { label: 'Revenue Cycle Management', delay: '1s', xOffset: '32px' },
  { label: 'Cash Flow & Payroll', delay: '1.5s', xOffset: '-32px' },
  { label: 'Patient Booking', delay: '2s', xOffset: '24px' },
];

const appearClass = 'opacity-0 ai-fade-in-up';

const AIFeatures: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes ai-fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .ai-fade-in-up {
          animation: ai-fade-in-up 0.7s forwards;
        }
      `}</style>
      <div className="flex flex-col items-center gap-9">
        {tagData.map((tag, i) => (
          <div
            key={tag.label}
            className={appearClass}
            style={{ animationDelay: tag.delay, transform: `translateX(${tag.xOffset})` }}
          >
            <span
              className="bg-[#fffcf2]/10 backdrop-blur-sm text-[#fffcf2] border border-[#fffcf2]/20 px-6 py-3 rounded-2xl text-lg font-semibold"
              style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.2rem' }}
            >
              {tag.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default AIFeatures; 