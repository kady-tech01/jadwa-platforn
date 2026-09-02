import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderPlus, FileText, PieChart, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'لوحة التحكم', href: '/', icon: LayoutDashboard },
    { name: 'مشروع جديد', href: '/projects/new', icon: FolderPlus },
    { name: 'دراسات الجدوى', href: '/projects', icon: FileText },
    { name: 'التحليلات المالية', href: '/analytics', icon: PieChart },
    { name: 'الإعدادات', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 dark:bg-slate-950 text-white min-h-screen p-4 flex flex-col justify-between border-l border-slate-800">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800 mb-6">
          <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-xl text-white">
            جـ
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">منصة جَدْوَى</h1>
            <span className="text-xs text-slate-400">Jadwa Platform</span>
          </div>
        </div>

        <nav className="space-y-1">
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
                    : 'text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Dark/Light Mode Toggle Button */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-400" />}
            <span>{theme === 'dark' ? 'الوضع المضيء' : 'الوضع الداكن'}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 dark:bg-slate-900 text-slate-400 uppercase">
            {theme}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;