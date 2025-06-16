
import React from 'react';
import { X, LogOut } from 'lucide-react';
import { Client } from '@/types/client';
import { SidebarNav } from './SidebarNav';
import { SidebarLiveFeed } from './SidebarLiveFeed';
import { SidebarAnalyticsSummary } from './SidebarAnalyticsSummary';
import { useClients } from '@/hooks/useClients';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onClose: () => void;
  onClientSelect: (client: Client) => void;
}

export const Sidebar = ({ onClose, onClientSelect }: SidebarProps) => {
  const { clients } = useClients();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CR</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CRM Pro</h1>
            <p className="text-xs text-gray-500">Sales Dashboard</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.user_metadata?.name || user.email}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Navigation */}
          <SidebarNav />

          {/* Analytics Summary */}
          <SidebarAnalyticsSummary clients={clients} />

          {/* Live Feed */}
          <SidebarLiveFeed clients={clients} onClientSelect={onClientSelect} />
        </div>
      </div>
    </div>
  );
};
