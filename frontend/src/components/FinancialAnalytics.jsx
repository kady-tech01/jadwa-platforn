import React, { useEffect, useState } from 'react';
import API from '../services/api';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { TrendingUp, DollarSign, Activity, Clock, AlertCircle } from 'lucide-react';

const FinancialAnalytics = ({ projectId }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await API.get(`projects/${projectId}/analytics/`);
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Failed to load financial analysis data.');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchAnalytics();
    }
  }, [projectId]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Calculating financial metrics with Pandas...</div>;
  }

  if (error || !analyticsData) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <span>{error || 'No analytics data available.'}</span>
      </div>
    );
  }

  const { financial_metrics, sensitivity_analysis, currency } = analyticsData;
  const cashFlows = financial_metrics.cash_flows || [];

  // Format Sensitivity Data for BarChart
  const sensitivityData = sensitivity_analysis?.revenue_sensitivity
    ? Object.keys(sensitivity_analysis.revenue_sensitivity).map((key) => ({
        scenario: `Revenue ${key}`,
        npv: sensitivity_analysis.revenue_sensitivity[key],
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase">Net Present Value (NPV)</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {financial_metrics.npv.toLocaleString()} {currency}
          </h3>
          <div className="flex items-center gap-1 text-emerald-600 text-xs mt-2 font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>{financial_metrics.npv > 0 ? 'Feasible Investment' : 'High Financial Risk'}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase">Internal Rate of Return (IRR)</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {financial_metrics.irr !== null ? `${financial_metrics.irr}%` : 'N/A'}
          </h3>
          <div className="flex items-center gap-1 text-blue-600 text-xs mt-2 font-medium">
            <Activity className="w-4 h-4" />
            <span>Target Discount Rate Comparison</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase">Payback Period</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {financial_metrics.payback_period_years !== null ? `${financial_metrics.payback_period_years} Years` : 'Not Recovered'}
          </h3>
          <div className="flex items-center gap-1 text-amber-600 text-xs mt-2 font-medium">
            <Clock className="w-4 h-4" />
            <span>Capital Recovery Duration</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase">Return on Investment (ROI)</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {financial_metrics.roi}%
          </h3>
          <div className="flex items-center gap-1 text-purple-600 text-xs mt-2 font-medium">
            <DollarSign className="w-4 h-4" />
            <span>Total Net Profitability Rate</span>
          </div>
        </div>
      </div>

      {/* Cash Flow Projection Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Cash Flow Projections Over Duration</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlows}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" tickFormatter={(yr) => `Year ${yr}`} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} ${currency}`, 'Net Cash Flow']} />
              <Area type="monotone" dataKey="net_cash_flow" stroke="#0284c7" fill="#e0f2fe" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sensitivity Analysis Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Sensitivity Analysis (NPV vs. Revenue Variations)</h3>
        <p className="text-xs text-slate-500 mb-4">Simulates impact on NPV if annual revenue shifts from -20% to +20%.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sensitivityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} ${currency}`, 'NPV']} />
              <Bar dataKey="npv" fill="#0369a1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;