
import { Phone, MessageSquare, CheckCircle, Skull } from 'lucide-react';

interface SidebarAnalyticsSummaryProps {
  stats: {
    callsMade: number;
    textsSent: number;
    dealsClosed: number;
    killCount: number;
  }
}

export function SidebarAnalyticsSummary({ stats }: SidebarAnalyticsSummaryProps) {
  return (
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
  );
}
