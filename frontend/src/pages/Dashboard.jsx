import React from 'react';
import { Plus, FileSpreadsheet, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'إجمالي الدراسات', value: '12', icon: FileSpreadsheet, color: 'text-blue-500' },
    { title: 'المشاريع النشطة', value: '5', icon: TrendingUp, color: 'text-emerald-500' },
    { title: 'إجمالي الاستثمارات', value: '1,250,000 دج', icon: DollarSign, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">لوحة التحكم</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">نظرة عامة على دراسات الجدوى والتحليلات المالية</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          دراسة جديد
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;