
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClients } from '@/hooks/useClients';
import { useClientActivity } from '@/hooks/useClientActivity';
import { useMemo } from 'react';
import { Client } from '@/types/client';
import { useNavigate } from "react-router-dom";
import { SidebarNav } from './SidebarNav';
import { SidebarAnalyticsSummary } from './SidebarAnalyticsSummary';
import { SidebarLiveFeed } from './SidebarLiveFeed';

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
        <SidebarNav />
      </div>

      {/* Analytics Summary with icons */}
      <div className="p-6 border-b border-gray-200">
        <SidebarAnalyticsSummary stats={stats} />
      </div>

      {/* Live Activity Feed */}
      <div className="px-6 pt-5 pb-2 flex-1 overflow-auto sidebar-scroll">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-base text-gray-900">Live Feed</h3>
        </div>
        <SidebarLiveFeed
          recentActivity={recentActivity}
          onClientSelect={onClientSelect}
          getActivityIcon={getActivityIcon}
          getTimeSince={getTimeSince}
        />
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
