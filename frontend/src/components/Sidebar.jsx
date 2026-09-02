import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderPlus, FileText, PieChart, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'لوحة التحكم', href: '/', icon: LayoutDashboard },
    { name: 'مشروع جديد', href: '/projects/new', icon: FolderPlus },
    { name: 'دراسات الجدوى', href: '/projects', icon: FileText },
    { name: 'التحليلات المالية', href: '/analytics', icon: PieChart },
    { name: 'الإعدادات', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800 mb-6">
        <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-xl">
          جـ
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none">منصة جَدْوَى</h1>
          <span className="text-xs text-slate-400">Jadwa Platform</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;