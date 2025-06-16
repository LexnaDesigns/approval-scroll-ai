import React from 'react';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet>
        <title>MoveMetal CRM - Built for Canadian Subprime</title>
        <meta name="description" content="A CRM built by a subprime finance manager for the people actually doing the deals. Secure, simple, and proudly Canadian." />
        <meta name="author" content="MoveMetal" />

        {/* Social Preview Meta */}
        <meta property="og:title" content="MoveMetal CRM" />
        <meta property="og:description" content="A CRM purpose-built for Canadian subprime auto dealers." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/movemetal-logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@movemetalcrm" />
        <meta name="twitter:image" content="/movemetal-logo.png" />

        {/* Favicon */}
        <link rel="icon" href="/movemetal-logo.png" type="image/png" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="flex justify-center py-6">
          <img src="/movemetal-logo.png" alt="MoveMetal CRM Logo" className="w-40 h-auto" />
        </div>

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
    </>
  );
};

export default Homepage;
