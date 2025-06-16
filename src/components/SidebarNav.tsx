
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Calendar, Users } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Clients', path: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
];

export const SidebarNav = () => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Navigation</h3>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
