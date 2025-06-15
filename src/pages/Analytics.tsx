
import React from "react";
import { BarChart3, Phone, MessageSquare, CheckCircle, Skull } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { useClientActivity } from "@/hooks/useClientActivity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Dummy data for rep comparison - in the future, fetch from backend
const repStats = [
  { name: 'You', value: 78, color: 'bg-blue-500' },
  { name: 'Anya', value: 62, color: 'bg-green-400' },
  { name: 'Carlos', value: 55, color: 'bg-orange-400' },
  { name: 'Tam', value: 44, color: 'bg-purple-400' },
  { name: 'Taylor', value: 33, color: 'bg-pink-400' },
];

export default function Analytics() {
  const { clients } = useClients();
  const { hotLeads, managerAlerts } = useClientActivity(clients);

  const stats = {
    callsMade: 47,
    textsSent: 123,
    dealsClosed: 8,
    killCount: 12
  };

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
      .slice(0, 18);
  };

  const recentActivity = getRecentActivity();

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
    <div className="max-w-4xl mx-auto py-10 px-2">
      <section className="mb-10">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Rep Standings</h2>
        </div>
        <div className="space-y-2 mb-4">
          {repStats.map((rep, idx) => (
            <div key={rep.name} className="flex items-center">
              <span className={`text-xs mr-2 ${idx === 0 ? "font-bold text-blue-700" : "text-gray-600"}`}>
                {rep.name === 'You' ? '🧑‍💼' : `#${idx+1}`}
              </span>
              <div className="flex-1 h-5 bg-gray-100 rounded-lg relative mr-2">
                <div
                  className={`absolute left-0 top-0 h-5 rounded-lg ${rep.color}`}
                  style={{
                    width: `${Math.max(rep.value, 10)}%`,
                    minWidth: 16,
                    transition: 'width 0.4s'
                  }}
                />
              </div>
              <span className="text-xs text-gray-700 w-8 text-right font-semibold tabular-nums">{rep.value}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-blue-700 text-center mb-2">
          You're in {1 + repStats.findIndex(r => r.name === 'You')}<sup>{['st','nd','rd','th','th'][repStats.findIndex(r => r.name === 'You')]}</sup> place! 🔥
        </p>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-green-50 rounded-lg p-4 text-center shadow">
            <div className="flex items-center justify-center mb-1">
              <Phone className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-700">Calls</span>
            </div>
            <div className="text-3xl font-bold text-green-700">{stats.callsMade}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center shadow">
            <div className="flex items-center justify-center mb-1">
              <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-700">Texts</span>
            </div>
            <div className="text-3xl font-bold text-blue-700">{stats.textsSent}</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 text-center shadow">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-semibold text-emerald-700">Deals</span>
            </div>
            <div className="text-3xl font-bold text-emerald-700">{stats.dealsClosed}</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center shadow">
            <div className="flex items-center justify-center mb-1">
              <Skull className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-semibold text-red-700">Killed</span>
            </div>
            <div className="text-3xl font-bold text-red-700">{stats.killCount}</div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-xl text-gray-900">Live Activity Feed</h3>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md p-4 mb-8 min-h-[440px] max-h-[600px] overflow-auto">
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative border"
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
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {activity.direction === 'inbound' ? (
                        <>📨 {activity.content}</>
                      ) : activity.type === 'ai' ? (
                        <>🤖 {activity.content}</>
                      ) : (
                        <>📤 {activity.content}</>
                      )}
                    </p>
                    {/* Activity badges */}
                    <div className="flex items-center space-x-2 mt-2">
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
      </section>
    </div>
  );
}
