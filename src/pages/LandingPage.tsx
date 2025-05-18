
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import NYCSection from '@/components/landing/NYCSection';
import ContactSection from '@/components/landing/ContactSection';
import AIChatWidget from '@/components/landing/AIChat';

const LandingPage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection />
      <FeaturesSection />
      <NYCSection />
      <ContactSection />
      
      <Footer />
      
      <AIChatWidget showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};

export default LandingPage;
