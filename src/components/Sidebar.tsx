
import { BarChart3, Phone, MessageSquare, CheckCircle, Skull, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const stats = {
    callsMade: 47,
    textsSent: 123,
    dealsClosed: 8,
    killCount: 12
  };

  return (
    <div className="w-64 bg-white h-full shadow-xl border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">🚗💥</h2>
          <p className="text-sm text-gray-600 mt-1">The Approval Board</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Today's Stats</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Calls Made</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {stats.callsMade}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">Texts Sent</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {stats.textsSent}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Deals Closed</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {stats.dealsClosed}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skull className="h-4 w-4 text-red-600" />
              <span className="text-sm text-gray-700">Kill Count</span>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              {stats.killCount}
            </Badge>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <Badge variant="destructive" className="ml-auto">
            3
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">📄 Michael Chen uploaded docs</p>
            <p className="text-xs text-orange-600 mt-1">2 minutes ago</p>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">⚠️ Sarah Johnson - Ready to Present</p>
            <p className="text-xs text-yellow-600 mt-1">15 minutes ago</p>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">👻 Jessica Williams hasn't responded</p>
            <p className="text-xs text-red-600 mt-1">2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-auto p-6">
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-gray-50"
          onClick={() => {}}
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};
