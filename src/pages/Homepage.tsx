
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HomepageHeader from '@/components/homepage/HomepageHeader';
import HeroSection from '@/components/homepage/HeroSection';
import RealityCheckSection from '@/components/homepage/RealityCheckSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import BuiltForYouSection from '@/components/homepage/BuiltForYouSection';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import CTASection from '@/components/homepage/CTASection';
import HomepageFooter from '@/components/homepage/HomepageFooter';

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect authenticated users to the main app
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <HomepageHeader />
      
      <HeroSection />
      
      <div className="container mx-auto px-4">
        <RealityCheckSection />
      </div>
      
      <FeaturesSection />
      
      <BuiltForYouSection />
      
      <TestimonialsSection />
      
      <CTASection />
      
      <HomepageFooter />
    </div>
  );
};

export default Homepage;
