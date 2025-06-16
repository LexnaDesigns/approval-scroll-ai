
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-red-900/30 text-red-200 border-red-800">
          Built by a Canadian dealer, for Canadian dealers
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Finally, a CRM That
          <span className="text-red-500"> Gets It</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          You know the drill. Another "game-changing" system that doesn't understand 
          how subprime financing actually works in Canada. This one's different. 
          Built for small lots, independent dealers, and solo agents building their own business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4 border-0"
          >
            See What's Inside
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            No Sales Pitch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
