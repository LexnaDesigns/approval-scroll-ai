
import { BarChart3, Phone, MessageSquare, CheckCircle, Skull, Settings, Bell, Home, Users, TrendingUp, Calendar } from 'lucide-react';
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

  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Clients', count: 156 },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: Calendar, label: 'Calendar' },
    { icon: Bell, label: 'Notifications', count: 3 },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 flex flex-col fixed left-0 top-0 z-30">
      {/* Navigation */}
      <div className="p-6 border-b border-gray-200">
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${
                item.active 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <Badge 
                  variant={item.active ? "secondary" : "outline"} 
                  className={item.active ? "bg-blue-500 text-white" : ""}
                >
                  {item.count}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>

      {/* Stats Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Today's Performance</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Phone className="h-4 w-4 text-green-600 mr-1" />
            </div>
            <div className="text-2xl font-bold text-green-700">{stats.callsMade}</div>
            <div className="text-xs text-green-600">Calls</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <MessageSquare className="h-4 w-4 text-blue-600 mr-1" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{stats.textsSent}</div>
            <div className="text-xs text-blue-600">Texts</div>
          </div>
          
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-emerald-600 mr-1" />
            </div>
            <div className="text-2xl font-bold text-emerald-700">{stats.dealsClosed}</div>
            <div className="text-xs text-emerald-600">Deals</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Skull className="h-4 w-4 text-red-600 mr-1" />
            </div>
            <div className="text-2xl font-bold text-red-700">{stats.killCount}</div>
            <div className="text-xs text-red-600">Killed</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 flex-1 overflow-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-orange-800 font-medium">Michael Chen uploaded documents</p>
              <p className="text-xs text-orange-600">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-yellow-800 font-medium">Sarah Johnson - Ready to Present</p>
              <p className="text-xs text-yellow-600">15 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-red-800 font-medium">Jessica Williams - No response</p>
              <p className="text-xs text-red-600">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-6 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-700 hover:bg-gray-100"
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );
};
