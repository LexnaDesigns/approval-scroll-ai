
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Client } from '@/types/client';

interface SidebarLiveFeedProps {
  recentActivity: Array<{
    id: string;
    client: Client;
    type: string;
    content: string;
    timestamp: string;
    direction: string;
    isHotLead: boolean;
    hasAlert: boolean;
  }>;
  onClientSelect?: (client: Client) => void;
  getActivityIcon: (type: string, direction: string) => React.ReactNode;
  getTimeSince: (timestamp: string) => string;
}

export function SidebarLiveFeed({
  recentActivity,
  onClientSelect,
  getActivityIcon,
  getTimeSince,
}: SidebarLiveFeedProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm min-h-[160px] max-h-[265px] overflow-auto">
      <div className="space-y-3">
        {recentActivity.length > 0 ? (
          recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative border group"
              onClick={() => onClientSelect && onClientSelect(activity.client)}
            >
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
  );
}
