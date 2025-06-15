
import { BarChart3, Phone, MessageSquare, CheckCircle, Skull, Settings, Bell, Home, Users, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useClients } from '@/hooks/useClients';
import { useClientActivity } from '@/hooks/useClientActivity';
import { useState } from 'react';
import { Client } from '@/types/client';

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

  // Get recent activity from all clients
  const getRecentActivity = () => {
    const activities = [];

    clients.forEach(client => {
      // Add recent communications
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
      .slice(0, 8);
  };

  const recentActivity = getRecentActivity();

  const handleActivityClick = (activity: any) => {
    if (onClientSelect) {
      onClientSelect(activity.client);
    }
  };

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

      {/* Analytics Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Rep Standings</h3>
        </div>
        <div>
          {/* Playful horizontal leaderboard */}
          <div className="space-y-2 mb-4">
            {repStats.map((rep, idx) => (
              <div key={rep.name} className={`flex items-center`}>
                <span className={`text-xs mr-2 ${idx === 0 ? "font-bold text-blue-700" : "text-gray-600"}`}>
                  {rep.name === 'You' ? '🧑‍💼' : `#${idx+1}`}
                </span>
                <div className="flex-1 h-4 bg-gray-100 rounded-lg relative mr-2">
                  <div
                    className={`absolute left-0 top-0 h-4 rounded-lg ${rep.color}`}
                    style={{
                      width: `${Math.max(rep.value, 10)}%`,
                      minWidth: 16,
                      transition: 'width 0.4s'
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-700 w-8 text-right font-semibold tabular-nums">{rep.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-700 text-center mb-2">
            You're in {1 + repStats.findIndex(r => r.name === 'You')}<sup>{['st','nd','rd','th','th'][repStats.findIndex(r => r.name === 'You')]}</sup> place! 🔥
          </p>
        </div>
        {/* Analytics Summary with icons */}
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
      <div className="p-6 flex-1 overflow-auto">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-gray-900">Live Activity Feed</h3>
        </div>
        <div className="space-y-3 max-h-96 overflow-auto">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div 
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 cursor-pointer transition-colors relative"
              >
                {/* Activity indicators */}
                <div className="flex-shrink-0 relative">
                  <div className="text-lg">
                    {getActivityIcon(activity.type, activity.direction)}
                  </div>
                  {activity.isHotLead && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  )}
                  {activity.hasAlert && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.client.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {getTimeSince(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {activity.direction === 'inbound' ? (
                      <>📨 {activity.content}</>
                    ) : activity.type === 'ai' ? (
                      <>🤖 {activity.content}</>
                    ) : (
                      <>📤 {activity.content}</>
                    )}
                  </p>
                  {/* Activity badges */}
                  <div className="flex items-center space-x-1 mt-2">
                    {activity.isHotLead && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700">
                        🔥 Hot
                      </span>
                    )}
                    {activity.hasAlert && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                        🚨 Alert
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
              <p className="text-xs">Activity will appear here as it happens</p>
            </div>
          )}
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
