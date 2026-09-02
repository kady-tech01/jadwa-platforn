from .cashflow import FinancialEngine


class SensitivityEngine:
    """
    Evaluates scenario stress tests (variations in Revenue or OPEX).
    """
    def __init__(self, project):
        self.project = project

    def run_sensitivity_analysis(self):
        engine = FinancialEngine(self.project)
        base_df = engine.generate_cash_flow_table()
        initial_inv = engine.get_initial_investment()
        discount_rate = engine.discount_rate

        if base_df.empty or initial_inv == 0:
            return {}

        variations = [-0.20, -0.10, 0.0, 0.10, 0.20]
        results = {
            'revenue_sensitivity': {},
            'opex_sensitivity': {}
        }

        # Revenue Sensitivity Analysis
        for var in variations:
            varied_cf = [
                row['net_cash_flow'] * (1 + var) if var != 0 else row['net_cash_flow']
                for _, row in base_df.iterrows()
            ]
            npv_val = np.npv(discount_rate, [-initial_inv] + varied_cf)
            results['revenue_sensitivity'][f"{int(var*100)}%"] = round(npv_val, 2)

        return results