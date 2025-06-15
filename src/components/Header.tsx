
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  hotLeadsCount: number;
  managerAlertsCount: number;
}

export const Header = ({ onMenuClick, hotLeadsCount, managerAlertsCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:justify-center">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>
      
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">🚗💥 THE APPROVAL BOARD</h1>
        <p className="text-sm text-gray-600">Social-Style CRM for Subprime Auto Finance</p>
        {(hotLeadsCount > 0 || managerAlertsCount > 0) && (
          <div className="flex justify-center space-x-4 mt-1">
            {hotLeadsCount > 0 && (
              <span className="text-xs text-orange-600 font-medium animate-pulse">
                🔥 {hotLeadsCount} Hot Lead{hotLeadsCount > 1 ? 's' : ''}
              </span>
            )}
            {managerAlertsCount > 0 && (
              <span className="text-xs text-red-600 font-medium animate-pulse">
                🚨 {managerAlertsCount} Alert{managerAlertsCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="lg:hidden w-10"></div>
    </header>
  );
};
