import pandas as pd
import numpy as np


class FinancialEngine:
    """
    Pandas & NumPy powered financial calculation engine for Feasibility Studies.
    """
    def __init__(self, project):
        self.project = project
        self.duration = project.project_duration_years
        self.discount_rate = float(project.discount_rate) / 100.0
        self.tax_rate = float(project.tax_rate) / 100.0

    def get_initial_investment(self):
        """Calculates total CAPEX (Initial Investment)."""
        capex_items = self.project.capex_items.all()
        if not capex_items.exists():
            return 0.0
        return sum(float(item.amount) for item in capex_items)

    def generate_cash_flow_table(self):
        """
        Generates year-by-year cash flow projections using Pandas DataFrame.
        """
        years = list(range(1, self.duration + 1))
        
        # Collect items
        revenue_items = list(self.project.revenue_streams.values())
        opex_items = list(self.project.opex_items.values())

        revenue_df = pd.DataFrame(revenue_items) if revenue_items else pd.DataFrame()
        opex_df = pd.DataFrame(opex_items) if opex_items else pd.DataFrame()

        records = []
        for year in years:
            # Calculate Revenue for Year
            if not revenue_df.empty:
                rev_year = (
                    revenue_df['yearly_revenue'].astype(float) * 
                    ((1 + revenue_df['growth_rate'].astype(float) / 100.0) ** (year - 1))
                ).sum()
            else:
                rev_year = 0.0

            # Calculate OPEX for Year
            if not opex_df.empty:
                opex_year = (
                    opex_df['yearly_cost'].astype(float) * 
                    ((1 + opex_df['growth_rate'].astype(float) / 100.0) ** (year - 1))
                ).sum()
            else:
                opex_year = 0.0

            ebit = rev_year - opex_year
            tax = max(0.0, ebit * self.tax_rate)
            net_cash_flow = ebit - tax

            records.append({
                'year': year,
                'revenue': round(rev_year, 2),
                'opex': round(opex_year, 2),
                'ebit': round(ebit, 2),
                'tax': round(tax, 2),
                'net_cash_flow': round(net_cash_flow, 2)
            })

        return pd.DataFrame(records)

    def calculate_metrics(self):
        """
        Calculates NPV, IRR, Payback Period, and ROI using NumPy.
        """
        initial_investment = self.get_initial_investment()
        df = self.generate_cash_flow_table()

        if df.empty or initial_investment == 0:
            return {
                'initial_investment': initial_investment,
                'npv': 0.0,
                'irr': None,
                'payback_period': None,
                'roi': 0.0
            }

        cash_flows = df['net_cash_flow'].tolist()
        flow_series = [-initial_investment] + cash_flows

        # Financial Calculations
        npv_value = np.npv(self.discount_rate, flow_series)
        try:
            irr_value = np.irr(flow_series) * 100
            irr_value = round(irr_value, 2) if not np.isnan(irr_value) else None
        except Exception:
            irr_value = None

        # Payback Period Calculation
        cumulative_cf = np.cumsum(flow_series)
        payback_years = None
        for idx, val in enumerate(cumulative_cf):
            if val >= 0:
                payback_years = idx
                break

        # Return on Investment (ROI)
        total_net_return = sum(cash_flows) - initial_investment
        roi = (total_net_return / initial_investment) * 100 if initial_investment > 0 else 0.0

        return {
            'initial_investment': round(initial_investment, 2),
            'npv': round(npv_value, 2),
            'irr': irr_value,
            'payback_period_years': payback_years,
            'roi': round(roi, 2),
            'cash_flows': df.to_dict(orient='records')
        }