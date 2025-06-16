
import React from 'react';

const RealityCheckSection = () => {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-8 mb-16 border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-red-400">Let's be honest about your current system...</h3>
      <div className="grid md:grid-cols-3 gap-6 text-left">
        <div>
          <p className="text-gray-300">
            It was designed for massive franchise operations with dedicated IT teams. 
            You're running a 15-car lot with your cousin doing the books.
          </p>
        </div>
        <div>
          <p className="text-gray-300">
            Half the features are for markets you'll never see, while the basics 
            you need daily are buried in sub-menus or missing entirely.
          </p>
        </div>
        <div>
          <p className="text-gray-300">
            You're paying enterprise prices for enterprise complexity when you just 
            need to track leads, follow up, and close deals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealityCheckSection;
