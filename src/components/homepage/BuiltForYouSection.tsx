
import React from 'react';
import { CheckCircle, BarChart3 } from 'lucide-react';

const BuiltForYouSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built For Your Reality</h2>
            <p className="text-xl text-gray-300">
              Whether you're running a small lot or building your own sales business
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-1">Perfect for small operations</p>
                    <p className="text-gray-400 text-sm">5 cars or 50 cars. One salesperson or a small team. Scales with your business, not against it.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-1">Solo agent friendly</p>
                    <p className="text-gray-400 text-sm">Building your own book? We get it. Track your pipeline, manage your leads, grow at your own pace.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-1">Canadian subprime focus</p>
                    <p className="text-gray-400 text-sm">Understands how financing actually works here. Credit rebuilding, payment plans, and real-world solutions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-1">No enterprise nonsense</p>
                    <p className="text-gray-400 text-sm">Simple pricing. Real support. No "implementation consultants" or six-month onboarding processes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Your Dashboard</h3>
                <p className="text-gray-300 text-sm mb-4">
                  The numbers you actually need, when you need them
                </p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Active leads:</span>
                    <span className="text-white font-mono">23</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">This month:</span>
                    <span className="text-green-400 font-mono">$47K</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">Follow-ups due:</span>
                    <span className="text-red-400 font-mono">6</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">Hot prospects:</span>
                    <span className="text-yellow-400 font-mono">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForYouSection;
