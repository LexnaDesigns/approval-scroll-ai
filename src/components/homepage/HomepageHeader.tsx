import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomepageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Removed logo and title block */}

        <div></div> {/* Keeps the layout aligned */}

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
