
import React from 'react';

const HomepageFooter = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CRM</span>
            </div>
            <div>
              <h3 className="font-bold text-white">Lot CRM</h3>
              <p className="text-sm">Built for Canadian auto sales</p>
            </div>
          </div>
          <div className="text-sm">
            © 2024 Lot CRM. No corporate speak. No BS.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomepageFooter;
