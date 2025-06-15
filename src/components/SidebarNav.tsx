
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Users, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: 'Dashboard', to: '/' },
  { icon: Users, label: 'Clients', count: 156 },
  { icon: TrendingUp, label: 'Analytics', to: '/analytics' },
  { icon: Calendar, label: 'Calendar', to: '/calendar' },
  { icon: Bell, label: 'Notifications', count: 3 },
];

export function SidebarNav() {
  const navigate = useNavigate();

  return (
    <nav className="space-y-2">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant={item.to === window.location.pathname ? "default" : "ghost"}
          className={`w-full justify-start ${
            item.to === window.location.pathname
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={item.to ? () => navigate(item.to!) : undefined}
        >
          <item.icon className="h-5 w-5 mr-3" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.count && (
            <Badge
              variant={item.to === window.location.pathname ? "secondary" : "outline"}
              className={item.to === window.location.pathname ? "bg-blue-500 text-white" : ""}
            >
              {item.count}
            </Badge>
          )}
        </Button>
      ))}
    </nav>
  );
}
