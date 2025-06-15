
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onMenuClick: () => void;
  hotLeadsCount: number;
  managerAlertsCount: number;
}

export const Header = ({ onMenuClick, hotLeadsCount, managerAlertsCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">The Approval Board</h1>
              <p className="text-xs text-gray-500">Social-Style CRM for Subprime Auto Finance</p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right side - Profile Avatar */}
        <div className="flex items-center space-x-4">
          {/* Activity Stats - showing live counts */}
          {(hotLeadsCount > 0 || managerAlertsCount > 0) && (
            <div className="flex items-center space-x-3">
              {hotLeadsCount > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-orange-600">
                    {hotLeadsCount} Hot Lead{hotLeadsCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              {managerAlertsCount > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-600">
                    {managerAlertsCount} Alert{managerAlertsCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Profile Avatar */}
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};
