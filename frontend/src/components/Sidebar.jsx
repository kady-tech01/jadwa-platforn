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
    <aside className="w-64 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen p-4 flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-sm">
            جـ
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-slate-900 dark:text-white">منصة جَدْوَى</h1>
            <span className="text-xs text-slate-500 dark:text-slate-400">Jadwa Platform</span>
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Dark/Light Toggle */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            <span>{theme === 'dark' ? 'الوضع المضيء' : 'الوضع الداكن'}</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;