
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PainPoints from '@/components/PainPoints';
import SolutionOverview from '@/components/SolutionOverview';
import BenefitsGrid from '@/components/BenefitsGrid';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PainPoints />
        <SolutionOverview />
        <BenefitsGrid />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
