
import React from 'react';
import { Client } from '@/types/client';
import { TrendingUp, Users, DollarSign, Target, Trophy, Zap } from 'lucide-react';

interface SidebarAnalyticsSummaryProps {
  clients: Client[];
}

export const SidebarAnalyticsSummary = ({ clients }: SidebarAnalyticsSummaryProps) => {
  const totalClients = clients.length;
  const hotLeads = clients.filter(c => 
    c.communications.some(comm => 
      new Date(comm.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    )
  ).length;
  const closedDeals = clients.filter(c => c.stage === 'Delivered').length;
  const avgCreditScore = Math.round(
    clients.reduce((sum, c) => sum + (c.creditScore || 0), 0) / totalClients
  );

  // Mock rep comparison data
  const myStats = {
    deals: closedDeals,
    leads: hotLeads,
    score: avgCreditScore
  };

  const topRep = {
    name: "Sarah K.",
    deals: 15,
    leads: 8,
    score: 745
  };

  const getPerformanceColor = (my: number, top: number) => {
    const ratio = my / top;
    if (ratio >= 0.8) return 'text-green-600';
    if (ratio >= 0.6) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
          Quick Stats
        </h3>
        <Trophy className="h-4 w-4 text-yellow-500" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center justify-between">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-800">{totalClients}</span>
          </div>
          <p className="text-xs text-blue-700 mt-1 font-medium">Total Leads</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
          <div className="flex items-center justify-between">
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-xs font-bold text-green-800">{hotLeads}</span>
          </div>
          <p className="text-xs text-green-700 mt-1 font-medium">Hot Leads</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center justify-between">
            <DollarSign className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-800">{closedDeals}</span>
          </div>
          <p className="text-xs text-purple-700 mt-1 font-medium">Closed</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
          <div className="flex items-center justify-between">
            <Target className="h-4 w-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-800">{avgCreditScore}</span>
          </div>
          <p className="text-xs text-orange-700 mt-1 font-medium">Avg Score</p>
        </div>
      </div>

      {/* Rep Comparison */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-gray-800">vs Top Rep</h4>
          <span className="text-xs text-gray-500">{topRep.name}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Deals</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold ${getPerformanceColor(myStats.deals, topRep.deals)}`}>
                {myStats.deals}
              </span>
              <span className="text-xs text-gray-400">/{topRep.deals}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Hot Leads</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold ${getPerformanceColor(myStats.leads, topRep.leads)}`}>
                {myStats.leads}
              </span>
              <span className="text-xs text-gray-400">/{topRep.leads}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Avg Score</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold ${getPerformanceColor(myStats.score, topRep.score)}`}>
                {myStats.score}
              </span>
              <span className="text-xs text-gray-400">/{topRep.score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
