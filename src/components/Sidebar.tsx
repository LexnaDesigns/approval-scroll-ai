
import { Phone, MessageSquare, CheckCircle, Skull, Settings, Bell, Home, Users, TrendingUp, Calendar, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useClients } from '@/hooks/useClients';
import { useClientActivity } from '@/hooks/useClientActivity';
import { useState, useMemo } from 'react';
import { Client } from '@/types/client';
import { useNavigate } from "react-router-dom";

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

  // -- SIDEBAR LIVE FEED LOGIC (from Analytics) --
  const getRecentActivity = () => {
    const activities = [];
    clients.forEach(client => {
      const recentComms = client.communications
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 2);
      recentComms.forEach(comm => {
        activities.push({
          id: `${client.id}-${comm.id}`,
          client,
          type: comm.type,
          content: comm.content,
          timestamp: comm.timestamp,
          direction: comm.direction,
          isHotLead: hotLeads.has(client.id),
          hasAlert: managerAlerts.has(client.id)
        });
      });
    });
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  };

  const recentActivity = useMemo(getRecentActivity, [clients, hotLeads, managerAlerts]);
  const getActivityIcon = (type: string, direction: string) => {
    if (type === 'text') {
      return direction === 'inbound' ? '📱' : '💬';
    }
    if (type === 'ai') {
      return '🤖';
    }
    if (type === 'call') {
      return '📞';
    }
    return '💬';
  };
  const getTimeSince = (timestamp: string) => {
    const now = new Date().getTime();
    const time = new Date(timestamp).getTime();
    const diff = now - time;
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

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

      {/* Live Activity Feed */}
      <div className="px-6 pt-5 pb-2 flex-1 overflow-auto sidebar-scroll">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-base text-gray-900">Live Feed</h3>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm min-h-[160px] max-h-[265px] overflow-auto">
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative border group"
                  onClick={() => onClientSelect && onClientSelect(activity.client)}
                >
                  {/* Activity indicators */}
                  <div className="flex-shrink-0 relative">
                    <div className="text-base">
                      {getActivityIcon(activity.type, activity.direction)}
                    </div>
                    {activity.isHotLead && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                    {activity.hasAlert && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-gray-900 truncate">
                        {activity.client.name}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {getTimeSince(activity.timestamp)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700 line-clamp-2">
                      {activity.direction === 'inbound' ? (
                        <>📨 {activity.content}</>
                      ) : activity.type === 'ai' ? (
                        <>🤖 {activity.content}</>
                      ) : (
                        <>📤 {activity.content}</>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {activity.isHotLead && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-orange-100 text-orange-700">
                          🔥 Hot
                        </span>
                      )}
                      {activity.hasAlert && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-red-100 text-red-700">
                          🚨 Alert
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 text-xs">
                <MessageSquare className="h-5 w-5 mx-auto mb-1 opacity-50" />
                No recent activity
              </div>
            )}
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
