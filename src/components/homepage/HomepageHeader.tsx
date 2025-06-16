
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomepageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CRM</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Lot CRM</h1>
            <p className="text-xs text-gray-400">Built for Canadian auto sales</p>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/auth')} 
          className="bg-red-600 hover:bg-red-700 border-0"
        >
          Take a Look
        </Button>
      </div>
    </header>
  );
};

export default HomepageHeader;
