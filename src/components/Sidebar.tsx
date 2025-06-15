import { BarChart3, Phone, MessageSquare, CheckCircle, Skull, Settings, Bell, Home, Users, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useClients } from '@/hooks/useClients';
import { useClientActivity } from '@/hooks/useClientActivity';
import { useState } from 'react';
import { Client } from '@/types/client';
import { useNavigate } from "react-router-dom";

// Dummy data for rep comparison - in the future, fetch from backend
const repStats = [
  { name: 'You', value: 78, color: 'bg-blue-500' },
  { name: 'Anya', value: 62, color: 'bg-green-400' },
  { name: 'Carlos', value: 55, color: 'bg-orange-400' },
  { name: 'Tam', value: 44, color: 'bg-purple-400' },
  { name: 'Taylor', value: 33, color: 'bg-pink-400' },
];

interface SidebarProps {
  onClose: () => void;
  onClientSelect?: (client: Client) => void;
}

export const Sidebar = ({ onClose, onClientSelect }: SidebarProps) => {
  const { clients } = useClients();
  const { hotLeads, managerAlerts } = useClientActivity(clients);
  const navigate = useNavigate();

  const stats = {
    callsMade: 47,
    textsSent: 123,
    dealsClosed: 8,
    killCount: 12
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/' },
    { icon: Users, label: 'Clients', count: 156 },
    { icon: TrendingUp, label: 'Analytics', to: '/analytics' },
    { icon: Calendar, label: 'Calendar', to: '/calendar' },
    { icon: Bell, label: 'Notifications', count: 3 },
  ];

  return (
    <div className="w-[22rem] bg-white h-screen shadow-lg border-r border-gray-200 flex flex-col fixed left-0 top-0 z-30">
      {/* Navigation */}
      <div className="p-6 border-b border-gray-200">
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={item.to === window.location.pathname ? "default" : "ghost"}
              className={`w-full justify-start ${
                item.to === window.location.pathname
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={item.to ? () => navigate(item.to!) : undefined}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <Badge
                  variant={item.to === window.location.pathname ? "secondary" : "outline"}
                  className={item.to === window.location.pathname ? "bg-blue-500 text-white" : ""}
                >
                  {item.count}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>

      {/* Analytics Summary with icons */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-3 mt-2">
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

      {/* Settings */}
      <div className="p-6 border-t border-gray-200 mt-auto">
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
