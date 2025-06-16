
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-red-900/50 to-orange-900/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready for a CRM That Actually Works?
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          No feature bloat. No enterprise complexity. Just the tools you need 
          to track leads, follow up consistently, and close more deals.
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/auth')}
          className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4 border-0"
        >
          See What's Inside
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-sm text-gray-400 mt-4">
          No credit card. No commitment. No sales calls. Just take a look.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
