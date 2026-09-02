import React from 'react';
import { TrendingUp, DollarSign, Activity, FileCheck } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'إجمالي المشاريع', value: '12', icon: FileCheck, color: 'text-blue-600' },
    { label: 'متوسط صافي القيمة الحالية (NPV)', value: '$145,000', icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'إجمالي الاستثمارات (CAPEX)', value: '$820,000', icon: DollarSign, color: 'text-amber-600' },
    { label: 'معدل العائد الداخلي (IRR)', value: '18.4%', icon: Activity, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">لوحة التحكم الرئيسية</h1>
        <p className="text-slate-500 text-sm">نظرة عامة على مؤشرات الأداء والدراسات المالية</p>
      </div>

      {/* Cards Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-slate-50 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for Quick Actions or Recent Projects Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">أحدث دراسات الجدوى</h2>
        <p className="text-sm text-slate-400">سيتم عرض قائمة المشاريع ودراسات الجدوى النشطة هنا فور ربطها بالـ Backend.</p>
      </div>
    </div>
  );
};

export default Dashboard;