
import React from 'react';
import { Home, BarChart3, Calendar, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Settings', href: '#', icon: Settings },
];

export const SidebarNav = () => {
  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group rounded-lg px-3 py-2 text-sm font-medium flex items-center transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};
