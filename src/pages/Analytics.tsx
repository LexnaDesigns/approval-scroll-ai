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

  // The live feed has been moved to the sidebar per user request

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
    </div>
  );
}
